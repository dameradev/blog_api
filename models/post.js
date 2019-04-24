const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024
  }
}));

module.exports = Post;