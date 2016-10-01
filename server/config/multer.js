const multer = require('multer');
// const upload = multer({dest: './server/photoProcesser/temp/'});
// JULIE'S PATH
const upload = multer({dest: './temp'});
const type = upload.single('photo');

module.exports = type;
