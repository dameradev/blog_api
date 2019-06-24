const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Post, validate} = require('../models/post');
const {Topic} = require('../models/topic');

router.get('/', async (req, res) => {
  const posts = await Post.find();

  res.send(posts);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  const topic = await Topic.findById(req.body.topicId);
  if(!topic) return res.status(400).send('Topic id doesn\' exists.')
  

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    topicId: req.body.topicId
  });

  await post.save();
  res.send(post);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('topicId');
  if(!post) return res.status(404).send('Post with the given ID was not found!');

  res.send(post);
});

router.put('/:id', async (req, res) => {
  const {errors} = validate(req.body);
  if(errors) return res.status(400).send(errors.details[0].message);

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