const error = require('./middleware/error');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')
const config = require('config');
const express = require('express');
const app = express();
const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const {logger, handleExeptions} = require('./startup/logging');

handleExeptions();

app.use(express.json());
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);




mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
  .then(() => {
    logger.log('info', 'Connected to mongoose');
  });
  
 

if(!config.get('jwtPrivateKey')) 
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined');



const port = process.env.PORT || 3000;
app.listen(3000, () => logger.log('info', `Listening on port ${port}...`))
