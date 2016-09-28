const multer = require('./multer.js');
const photoUpload = require('../photoProcessers/photoUpload');

module.exports = (app, express) => {
  app.post('/test', (req, res) => {
    console.log('requested', req.body);
    res.send('here');
  });
  app.post('/photoProcessor/upload/:id', multer, photoUpload);
};
