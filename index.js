const config = require('config');
const express = require('express');
const app = express();
const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/posts', posts);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'));

 

if(!config.get('jwtPrivateKey')) 
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined');



const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`))
