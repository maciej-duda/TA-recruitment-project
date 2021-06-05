const { mongo } = require("mongoose");
const mongoose = require('mongoose')

const imageData = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    files_id: mongoose.Types.ObjectId,
    n: Number,
    data: Buffer
}, {collection: "fs.chunks"});

module.exports = mongoose.model('ImageData', imageData)