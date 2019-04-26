const Joi = require('joi');
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    min: 6,
    max: 50
  }
})

const Topic = mongoose.model('Topic', topicSchema);

const validateTopic = function(topic) {
  const schema = {
    name: Joi.string().min(6).max(50).required()
  }

  return Joi.validate(topic, schema);
}

exports.Topic = Topic;
exports.validate = validateTopic;