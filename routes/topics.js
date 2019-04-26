const express = require('express');
const router = express.Router();
const {Topic, validate} = require('../models/topic');

router.get('/', async(req, res) => {
  const topics = await Topic.find().sort('name');

  res.send(topics);
});

router.post('/', async(req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topic = new Topic({
    name: req.body.name
  });

  await topic.save();

  res.send(topic);
});

module.exports = router;