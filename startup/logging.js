const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    // new winston.transports.MongoDB({db: 'mongodb://localhost/blog', collection: 'log'})
  ]
}); 

const handleExeptions = function(){
  winston.exceptions.handle(
    new winston.transports.File({filename: 'uncaughtExeptions.log'}),
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.MongoDB({db: 'mongodb://localhost/blog', collection: 'log'})
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}

exports.logger = logger;
exports.handleExeptions = handleExeptions;