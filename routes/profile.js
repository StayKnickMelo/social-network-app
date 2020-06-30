const express = require('express');
const { check, validationResult } = require('express-validator');
const { protect } = require('../middleware/protect');
const conn = require('../config/db');


const router = express.Router();



// @route   GET api/profiles/me
// @desc    Get current user profile
// @access  Private
router.get('/me', [protect], async (req, res) => {
  try {
    const profile = await conn.model('Profile').findOne({ user: req.user._id }).populate('user', ['name']);

    if (!profile) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      });
    };


    res.status(200).json({
      success: true,
      data: profile
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    });
  }
});

// @route   GET api/profiles/user:/id
// @desc    Get user's profile by user id
// @access  Public
router.get('/user/:id', async(req,res)=>{
  try {

    const profile = await conn.model('Profile').findOne({user: req.params.id}).populate('user', ['name']);

    if(!profile){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Profile Not Found'}] 
      });
    };

    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error(error.message);

    if (error.name = 'CastError') {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      })
    }

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
    
  };
});

// @route   GET api/profiles/:id
// @desc    Get user's profile by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await conn.model('Profile').findById(req.params.id).populate('user', ['name']);


    if (!profile) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      });
    };

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error(error.message);

    if (error.name = 'CastError') {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      })
    }

    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    });
  }
})


// @route   GET api/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await conn.model('Profile').find().populate('user', ['name']);

    if (!profiles) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profiles Not Found' }]
      });
    };

    res.status(200).json({
      success: true,
      data: profiles,
      count: profiles.length
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    });

  };
});


// @route   POST api/profiles
// @desc    Add/Update a profile
// @access  Private
router.post('/', [protect, [
  check('skills', 'Please add your skills').not().isEmpty(),
  check('status', 'Please choose your current status').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({
      success: false,
      errors: errors.array()
    });
  };

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user._id;
  if (company) { profileFields.company = company };
  if (website) { profileFields.website = website };
  if (location) { profileFields.location = location };
  if (bio) { profileFields.bio = bio };
  if (status) { profileFields.status = status };
  if (githubusername) { profileFields.githubusername = githubusername };
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  };

  profileFields.social = {};

  if (youtube) { profileFields.social.youtube = youtube };
  if (facebook) { profileFields.social.facebook = facebook };
  if (twitter) { profileFields.social.twitter = twitter };
  if (instagram) { profileFields.social.instagram = instagram };
  if (linkedin) { profileFields.social.linkedin = linkedin };


  try {


    let profile = await conn.model('Profile').findOne({ user: req.user._id });

    if (profile) {
      profile = await conn.model('Profile').findOneAndUpdate({ user: req.user._id },
        { $set: profileFields },
        {
          new: true,
          runValidators: true
        }).populate('user', ['name']);

      return res.status(200).json({
        success: true,
        data: profile
      });
    };

    await conn.model('Profile').create(profileFields);

    profile = await conn.model('Profile').findOne({ user: req.user._id }).populate('user', ['name']);


    res.status(201).json({
      success: true,
      data: profile
    });




  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    })

  }

});



// @route   DELETE api/profiles
// @desc    DELETE user profile
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const profile = await conn.model('Profile').findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      });
    };


    if (profile.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Unauthorized' }]
      });
    };

    await profile.remove();


    res.status(200).json({
      success: true,
      deleted: true
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    });
  };
});


// @route   PUT api/profiles/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [protect, [
  check('title', 'Please add a title').not().isEmpty(),
  check('company', 'Please add a company').not().isEmpty(),
  check('from', 'Please add a start date').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const profile = await conn.model('Profile').findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      })
    };

    if (profile.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Unauthorized' }]
      });
    };



    profile.experience.unshift(req.body);

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });



  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server Error' }]
    })
  }
});


// @route   PUT api/profiles/education
// @desc    Add profile experience
// @access  Private
router.put('/education', [protect, [
  check('school', 'Please Add a School').not().isEmpty(),
  check('degree', 'Please Add a Degree').not().isEmpty(),
  check('fieldofstudy', 'Please Add Field of Study').not().isEmpty(),
  check('from', 'Please Add a Start Date').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };

  try {
    const profile = await conn.model('Profile').findOne({ user: req.user._id });


    if (!profile) {
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Profile Not Found'}]
      });
    };

    if(profile.user.toString() !== req.user._id.toString()){
      return res.status(401).json({
        success: false,
        errros: [{msg: 'Unauthorized'}]
      });
    };


     profile.education.unshift(req.body);

     await profile.save();


    res.status(200).json({
      success: true,
      data: profile
    });



  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});

// @route PUT api/profiles/avatar
// @desc Check for user avatar
// @access Private
router.put('/avatar', protect, async(req,res)=>{


  try {
    const profile = await conn.model('Profile').findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Profile Not Found' }]
      })
    };


    profile.avatar = true;

    await profile.save();

    res.status(200).json({
      success: true
    })
    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      erorrs: [{msg: 'Server Error'}]
    })
    
  }
  
});


// @route   DELETE api/profiles/experience/:id
// @desc    Delete experience
// @access  Private
router.delete('/experience/:id', protect, async(req,res)=>{
  try {
    const profile = await conn.model('Profile').findOne({user: req.user._id});

    if(!profile){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Profile Not Found'}]
      });
    };

    if(profile.user.toString() !== req.user._id.toString()){
      return res.status(401).json({
        success: false,
        errors: [{msg: 'Unauthorized'}]
      });
    };


    profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.id);


    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };

});


// @route   DELETE api/profiles/education/:id
// @desc    Delete education
// @access  Private
router.delete('/education/:id', protect, async(req,res)=>{
  try {
    const profile = await conn.model('Profile').findOne({user: req.user._id});

    if(!profile){
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Profile Not Found'}]
      });
    };


    if(profile.user.toString() !== req.user._id.toString()){
      return res.status(400).json({
        success: false,
        errors: [{msg: 'Unauthorized'}]
      });
    };


    profile.education = profile.education.filter(edu => edu._id.toString() !== req.params.id);


    await profile.save();


    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };
});

module.exports = router;