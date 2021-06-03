const { mongo } = require("mongoose");
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type:String, required:true},
  email: {type:String, trim:true, required:true},
  password: {type:String, trim:true, required:true},
  date: {type:Date, default:Date.now},
  imgName: {type:String, trim:true},
  img:
  {
      data: Buffer,
      contentType: String
  }
  
});

module.exports = mongoose.model('User', userSchema)