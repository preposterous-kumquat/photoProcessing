const multer = require('./multer.js');
const photoUpload = require('../photoProcessers/photoUpload');
const validPhoto = require('../photoProcessers/validPhoto');
const train = require('../photoProcessers/clarifai').train;

module.exports = (app, express) => {
  app.post('/photoProcessor/validPhoto', multer, validPhoto);
  app.post('/photoProcessor/upload/:id', multer, photoUpload);
  app.post('/getTrainingData', train);
};
