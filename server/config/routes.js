const multer = require('../photoProcessers/multer.js');
const photoUpload = require('../photoProcessers/photoUpload');

module.exports = (app, express) => {
  app.post('/photoProcessor/upload/:id', multer, photoUpload);
};
