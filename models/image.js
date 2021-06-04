var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    filename: String,
    userId: String
});

module.exports = new mongoose.model('Image', imageSchema);