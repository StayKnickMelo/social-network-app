const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const conn = require('../config/db');
const { protect } = require('../middleware/protect');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', [
  check('name', 'Please add a name').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })

], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  try {
    let user = await conn.model('User').findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success: false,
        errors: [{msg: 'Email Alredy Taken'}]
      });
    };

    user = await conn.model('User').create(req.body);

    sendTokenResponse(user, 201, res);

  } catch (error) {

    console.error(error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', [
  check('email', 'Please enter an email').not().isEmpty(),
  check('password', 'Please enter a password').not().isEmpty()

], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }
  try {
    const user = await conn.model('User').findOne({ email: req.body.email }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: [{msg: 'Invalid Credentials'}]
      })
    };

    const isMatched = await user.matchPassword(req.body.password);

    if (!isMatched) {
      return res.status(404).json({
        success: false,
        errors: [{ msg: 'Invalid Credentials' }]
      });
    }


    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
});


// @route   GET api/users/me
// @desc    Get logged in  user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });

  };
});

// Has avatar
router.put('/avatar', protect, async(req,res)=>{
  try {
    const user = await conn.model('User').findById(req.user._id);


    user.avatar = true;


    await user.save();

    res.status(200).json({
      success: true
    })

       
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    })


    
  }
})


const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};







module.exports = router;