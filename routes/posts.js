const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
  const posts = await Post.find();

  res.send(posts);
});

router.post('/', async (req, res) => {
  
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  await post.save();
  res.send(post);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post) return res.status(404).send('Post with the given ID was not found!');

  res.send(post);
});

router.put('/:id', async (req, res) => {
  const post = await Post.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  }, { new: true });
  if(!post) return res.status(404).send('Post with the given ID was not found!');

  res.send(post);
});

router.delete('/:id', async (req, res) => {
  const post = await Post.findOneAndDelete(req.params.id);
  if(!post) return res.status(404).send('Post with the given ID was not found!');
  
  res.send(post);
});


module.exports = router;