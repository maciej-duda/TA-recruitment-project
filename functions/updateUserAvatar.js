const mongoose = require('mongoose')
const User = require('../models/user')


const updateUserAvatar = async (req, res, path) => {
    req.user.imagePath = path
    await User.findOneAndUpdate({ _id: req.user.id }, { imagePath: path })

    // Dodac usuniecie starego obrazka z bazy

}

module.exports = updateUserAvatar
