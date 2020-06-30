const mongoose = require('mongoose');
const config = require('config');

const conn = mongoose.createConnection(config.get('MONGO_URI'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true

});

conn.model('User', require('../model/User'));
conn.model('Profile', require('../model/Profile'));
conn.model('Post', require('../model/Post'));

module.exports = conn;