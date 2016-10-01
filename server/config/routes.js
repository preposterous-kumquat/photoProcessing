const multer = require('./multer.js');
const photoUpload = require('../photoProcessers/photoUpload');

module.exports = (app, express) => {
  app.post('/test', multer, (req, res) => {
    console.log('requested', req);
    console.log('body', req.body);
    console.log('file', req.file);
    res.send('here');
  });
  app.post('/photoProcessor/upload/:id', multer, photoUpload);
};


