const express = require('express');
const app = express();
const posts = require('./routes/posts');

app.use(express.json());
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`))
