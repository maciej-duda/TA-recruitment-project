const { mongo } = require("mongoose");
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true},
  newsTitle : {type: String, required: true},
  content : { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema)