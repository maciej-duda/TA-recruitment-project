const { mongo } = require("mongoose");
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
    password: {type:String, trim:true, required:true},
    email:    {type:String, trim:true, required:true},
    date:     {type:Date, defualt:Date.now}
  });

  module.exports = mongoose.model('User', userSchema)