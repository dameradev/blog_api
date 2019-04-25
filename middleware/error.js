const {logger} = require('../startup/logging');

module.exports = function(err, req, res, next) {
  logger.log('error', err.message, err);
  res.status(500).send('Something failed');
}
