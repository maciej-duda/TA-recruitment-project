const util = require("util");
const multer = require("multer");
require("dotenv").config({ path: "./config/.env" });
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFiles = util.promisify(uploadFile);
module.exports = uploadFiles;