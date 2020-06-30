const express = require('express');
const {check, validationResult} = require('express-validator');
const conn = require('../config/db');
const {protect} = require('../middleware/protect');
const router = express.Router();


// @route   POST api/posts
// @desc    Add a post from a user
// @access  Private
router.post('/', [protect, [
  check('text', 'Please add some text').not().isEmpty()
]], async(req,res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };


  try {
    req.body.user = req.user._id;
    req.body.avatar = req.user._id.toString();
    req.body.name = req.user.name;
    req.body.avatar = req.user.avatar;

    const post = await conn.model('Post').create(req.body);

    const postWithAvatar = await conn.model('Post').findById(post._id).populate('user', ['avatar']);


    res.status(201).json({
      success: true,
      data: postWithAvatar
    });




    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    })
    
  }
});

// @route   GET api/posts
// @desc    Get all Posts
// @access  Private
router.get('/', protect, async(req,res)=>{
  try {
    const posts = await conn.model('Post').find().sort({createdAt: -1}).populate('user', ['avatar']);

    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});

// @route   GET api/posts/:id
// @desc    Get a single post by id
// @access  Private
router.get('/:id', protect, async(req,res)=>{
  try {
    const post = await conn.model('Post').findById(req.params.id).populate('user', ['avatar']);

    if(!post){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Post Not Found'}]
      });
    };

    res.status(200).json({
      success: true,
      data: post
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});


// @route   DELETE api/posts/:id
// @desc    Delete a post by id
// @access  Private
router.delete('/:id', protect, async(req,res)=>{
  try {
    const post = await conn.model('Post').findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Post Not Found'}]
      });
    };

    if(post.user.toString() !== req.user._id.toString()){
      return res.status(401).json({
        success: false,
        errors: [{msg: 'Unauthorized'}]
      });
    };

    await post.remove();

    res.status(200).json({
      success: true,
      deleted: true
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});


// @route   PUT api/posts/:id/comments
// @desc    Add a comment to a post
// @access  Private
router.put('/:id/comments', [protect,[
  check('text', 'Please add your comment').not().isEmpty()
]], async(req,res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };


  try {
    const post = await conn.model('Post').findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Post Not Found'}]
      })
    };


    req.body.user = req.user._id;
    req.body.name = req.user.name;
    req.body.avatar = req.user._id.toString();

    post.comments.unshift(req.body);

    await post.save();

    res.status(200).json({
      success: true,
      data: post.comments
    });


    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});


// @route   DELETE api/posts/:id/comments/:commentId
// @desc    Delete a comment from a post
// @access  Private
router.delete('/:id/comments/:commentId', protect, async(req,res)=>{
  try {
    const post = await conn.model('Post').findById(req.params.id);

    if(!post){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Post Not Found'}]
      });
    };


    if(!post.comments.filter(comment => comment.user.toString() === req.user._id.toString()).length > 0){
      return res.status(401).json({
        success: false,
        errors: [{msg: 'Unauthorized'}]
      });
    };

    post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.commentId);


    await post.save();

    res.status(200).json({
      success: true,
      data: post.comments
    });
    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});


// @route   PUT api/posts/:id/likes
// @desc    Add a like to a post
// @access  Private
router.put('/:id/likes', protect, async(req,res)=>{
  try {
    const post = await conn.model('Post').findById(req.params.id);


    if(!post){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Post Not Found'}]
      });
    };

    if(post.likes.filter(like => like.user.toString() === req.user._id.toString()).length > 0){
      return res.status(400).json({
        success: false,
        errors: [{msg: 'Post Alredy Liked'}]
      });
    };

    const like = {
      user: req.user._id,
      name: req.user.name
    }

    post.likes.unshift(like);

    await post.save();


    res.status(200).json({
      success: true,
      data: post.likes
    });
    

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});


// @route   DELETE api/posts/:id/likes/
// @desc    Delete a like from a post
// @access  Private
router.delete('/:id/likes/', protect, async(req,res)=>{
  try {
    const post = await conn.model('Post').findById(req.params.id);


    if(!post){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Post Not Found'}]
      });
    };


    if(post.likes.filter(like => like.user.toString() === req.user._id.toString()).length === 0){
      return res.status(400).json({
        success: false,
        errors: [{msg: 'You Have Not Liked This Post'}]
      });
    };


    post.likes = post.likes.filter(like => like.user.toString() !== req.user._id.toString());


    await post.save();


    res.status(200).json({
      success: true,
      data: post.likes
    });
    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});


router.delete('/:id/likestodelte', async(req,res)=>{
  try {
    const post = await conn.model('Post').findById(req.params.id);


    post.likes = [];

    await post.save();

    res.status(200).json({
      success: true,
      data: post
    })
    
  } catch (error) {
    
  }
});

// Add avatar param
// router.put('/avatar', protect, async(req,res)=>{

//   try {
//     const post = await conn.model('Post').findOne({user: req.user._id});

//     if(!post){
//       return res.status(404).json({
//         success: false,
//         errors: [{msg: 'Post Not Found'}]
//       });
//     };

//     post.avatar = true;

//     await post.save();

//     res.status(200).json({
//       success: true
//     })
    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       errors: [{msg: 'Server Error'}]
//     })
//   }

// })

// Add avater
// router.put('/avatar', protect, async(req,res)=>{

//   const filed = {avatar: true}
//   try {
//     const posts = await conn.model('Post').find({user: req.user._id});

//     if(!posts){
//       return res.status(404).json({
//         success: false,
//         errors: [{msg: 'Posts Not Found'}]
//       })
//     };

//     posts.forEach(post =>  conn.model('Post').findByIdAndUpdate(post._id, {$set: filed}, {new: true}))

    

//     res.status(200).json({
//       success: true,
//       data: posts
//     })
    
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({
//       success: false,
//       errors: [{msg: 'Server Error'}]
//     })
    
//   }
// })






module.exports = router;



