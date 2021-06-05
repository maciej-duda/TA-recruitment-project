const mongoose = require('mongoose')
const User = require('../models/user')


const updateUserAvatar = async (req, res, fileId) => {
    req.user.fileId = fileId
    await User.findOneAndUpdate({ _id: req.user.id }, { imgId: fileId })

    // Dodac usuniecie starego obrazka z bazy

}

module.exports = updateUserAvatar
