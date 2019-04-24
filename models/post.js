const Joi = require('joi');
const mongoose = require('mongoose');


const Post = mongoose.model('Post', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024
  }
}));


function validatePost(post) {
  const schema = {
    title: Joi.string().min(10).max(255).required(),
    content: Joi.string().min(10).required()
  }

  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;