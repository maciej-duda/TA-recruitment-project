const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
require("dotenv").config();

var storage  = new GridFsStorage({url : process.env.MONGO_URI});

const fileFilter = (req,file,cb) => {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
        return cb(null,true);
    }
    cb("Error:file upload only supports the following filetype-" 
+filetypes);
}

var upload = multer({ storage: storage, fileFilter: fileFilter});

module.exports = upload