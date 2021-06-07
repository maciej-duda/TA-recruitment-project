const mongoose = require('mongoose')
const User = require('../models/user')
const fs = require('fs')


const updateUserAvatar = async (req, res, path) => {
  if (req.user.imagePath != "0") {
    var oldFile = './' + req.user.imagePath
    try {
      fs.unlinkSync(oldFile)
      //file removed
    } catch (err) {
      console.error(err)
    }
  }
  req.user.imagePath = path
  await User.findOneAndUpdate({ _id: req.user.id }, { imagePath: path })
  // Dodac usuniecie starego obrazka z bazy

}

module.exports = updateUserAvatar
