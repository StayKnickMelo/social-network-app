const jwt = require('jsonwebtoken');
const config = require('config');
const conn = require('../config/db');


exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  };


  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  };

  try {
    const decoded = jwt.verify(token, config.get('JWTSecret'));

    req.user = await conn.model('User').findById(decoded.id);

    next();

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  };
};