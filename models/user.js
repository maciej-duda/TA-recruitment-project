const { mongo } = require("mongoose");
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now },
  imagePath: {type: String, default: "0"}
});

module.exports = mongoose.model('User', userSchema)