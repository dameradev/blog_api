
const express = require('express');
const app = express();
const {logger, handleExeptions} = require('./startup/logging');

handleExeptions();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();



const port = process.env.PORT || 3000;
app.listen(3000, () => logger.log('info', `Listening on port ${port}...`))
