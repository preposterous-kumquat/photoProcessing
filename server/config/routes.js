const multer = require('./multer.js');
const photoUpload = require('../photoProcessers/photoUpload');

module.exports = (app, express) => {
  app.post('/photoProcessor/upload/:id', multer, photoUpload);
};
