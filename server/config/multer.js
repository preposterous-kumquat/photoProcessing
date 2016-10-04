const multer = require('multer');
const upload = multer({dest: './temp'});
const type = upload.single('photo');

module.exports = type;
