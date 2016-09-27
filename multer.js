const multer = require('multer');
const upload = multer({dest: './photoProcessing/temp/'});
const type = upload.single('image');

module.exports = type;

