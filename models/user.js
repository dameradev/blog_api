const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  email: {
    type: String, 
    required: true,
    minlength: 10,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
});

// export blog_api_jwtPrivateKey=secureKey
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this.id }, config.get('jwtPrivateKey'))
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(50).email().required(),
    password: Joi.string().min(6).max(1024).required()
  }

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;