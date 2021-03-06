const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/', async(req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword  = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email' ]))
});

function validate(user) {
  const schema = {
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required()
  }

  return Joi.validate(user, schema);
}

module.exports = router;