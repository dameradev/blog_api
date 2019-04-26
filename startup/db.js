const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
    .then(() => {
      logger.log('info', 'Connected to mongoose');
    });
}