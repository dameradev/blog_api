const express = require('express');
const error = require('../middleware/error');
const posts = require('../routes/posts');
const users = require('../routes/users');
const auth = require('../routes/auth');
const topics = require('../routes/topics');

module.exports = function(app){
  app.use(express.json());
  app.use('/api/posts', posts);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/topics', topics);
  app.use(error);
}