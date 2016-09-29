const multer = require('multer');
const upload = multer({dest: './photoProcessers/temp/'});
const type = upload.single('photo');

module.exports = type;

