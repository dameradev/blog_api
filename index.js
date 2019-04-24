const express = require('express');
const app = express();
const posts = require('./routes/posts');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/posts', posts);

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'));


const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`))
