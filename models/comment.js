const { mongo } = require("mongoose");
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content : { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema)