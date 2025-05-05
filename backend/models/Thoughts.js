// models/thoughtModel.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  visible:{type: String, default:"show"}
});

const thoughtSchema = new mongoose.Schema({
  text: { type: String, required: true },
  visible:{type: String, default:"show"},
  replies: [replySchema]
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
