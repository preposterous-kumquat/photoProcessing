const multer = require('multer');
const upload = multer({dest: './photoProcessers/temp/'});
const type = upload.single('image');

module.exports = type;

