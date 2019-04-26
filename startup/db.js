const mongoose = require('mongoose');
const {logger} = require('./logging');

module.exports = function() {
  mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
    .then(() => {
      logger.log('info', 'Connected to mongoose');
    });
}