const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: Boolean,
    default: false

  },
  likes:[
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      name:{
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = PostSchema;