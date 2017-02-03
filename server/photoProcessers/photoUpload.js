const photoMetaData = require('./photoMetadata.js');
const gm = require('gm').subClass({imageMagick: true});
const s3 = require('../config/amazon_s3.js').s3;
const bucket = require('../config/amazon_s3.js').bucket;
const fs = require('fs');
const generateFilePath = require('../config/helpers').generateFilePath;
const clarifai = require('./clarifai');
const helpers = require('../config/helpers').generateFilePath;
const axios = require('axios');

module.exports = (req, res) => {
  let id = req.params.id;
  let path = generateFilePath(id, 3);
  let response = {
    id: id,
    path: path,
    theme: req.body.theme
  };
  let tempPath = `${__dirname}/../../${req.file.path}`;
  let fileName = req.body.name.split('.')[0];
  let fileExt = req.body.name.split('.')[1];
  let resizedPath = `${__dirname}/../../temp/${fileName}_smaller.${fileExt}`;

  /************************* PHOTO METADATA *******************************/
  photoMetaData(tempPath) 
    .then((gps) => {
      console.log('GPS', gps);
      response['gps'] = gps;
    })
    .catch((err) => {
      console.log('ERROR', err);
    });

  // /**************** RESIZING PHOTOS & SAVING PHOTO ************************/
  gm(tempPath)
    .setFormat('jpg')
    .resize(720, 720)
    .write(resizedPath, (err, done) => {
      if (err) { 
        console.log(`Error in resizing ${err}`);
      } else {
        console.log(`Photo resized ${done}`);

        let fileStream = fs.readFileSync(resizedPath);

        let options = {
          ACL: 'public-read',
          Bucket: bucket,
          Key: path,
          Body: fileStream,
          ContentType: 'image/jpeg'
        };

        s3.uploadAsync(options)
          .then((upload) => {
            let url = upload.Location;

            response['url'] = url;
            console.log('URL: ', url);

            // clarifai.nsfw(url, (err, success) => {
            //   // console.log('NSFW SUCCESS',success,  err)
            //   res.send(success)
            // })

            clarifai.keywords(url, (err, success) => {
              response['clarifaiKeywords'] = success;
              res.status(200).json(response);

            });

            let deleteTemp = [tempPath, resizedPath];
            deleteTemp.forEach((file) => {
              fs.unlink(file, (err, deleted) => {
                if (err) {
                  console.log('Error on file delete: ', err);
                } else {
                  console.log('Temp file deleted');
                }
              }); 
            });

          })
          .catch((err) => {
            console.log('Failure error: ', err);
            return res.status(500).end('Upload to s3 failed');
          });

      }
    });
};


