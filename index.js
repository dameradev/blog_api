require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')
const config = require('config');

const mongoose = require('mongoose');
const {logger, handleExeptions} = require('./startup/logging');

handleExeptions();
require('./startup/routes')(app);





mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
  .then(() => {
    logger.log('info', 'Connected to mongoose');
  });
  
 

if(!config.get('jwtPrivateKey')) 
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined');



const port = process.env.PORT || 3000;
app.listen(3000, () => logger.log('info', `Listening on port ${port}...`))
