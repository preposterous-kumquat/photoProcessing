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
  console.log('ENTERED PHOTOUPLOAD', req.params.id);
  let id = req.params.id;
  let path = generateFilePath(id, 3);
  let response = {
    id: id,
    path: path,
    theme: req.body.theme
  };

  /************************* PHOTO METADATA *******************************/
  photoMetaData(`${__dirname}/../${req.file.path}`)
    .then((gps) => {
      console.log('GPS', gps);
      response['gps'] = gps;
    })
    .catch((err) => {
      console.log('ERROR', err);
    });

  /**************** RESIZING PHOTOS & SAVING PHOTO ************************/


  let tempPath = `${__dirname}/../${req.file.path}`;
  let fileName = req.file.originalname.split('.')[0];
  let fileExt = req.file.originalname.split('.')[1];
  let resizedPath = `${__dirname}/temp/${fileName}_smaller.${fileExt}`;

  gm(tempPath)
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

        // s3.uploadAsync(options)
        //   .then((upload) => {
        //     console.log('hi you got dones')
        //     res.send('hi you got dones')
        //     let url = upload.Location;

        //     response['url'] = url;

        //     // clarifai(url, (err, success) => {
        //     //   console.log('on photo upload', success);
        //     //   response['clarifaiKeywords'] = success;

        //     //   res.status(200).json(response);
        //     //   /********************* NEED TO UPDATE FOR DEV *****************************/
        //     //   axios.post('http://localhost:3000/savedPhoto', response)
        //     //     .then(function (response) {
        //     //       console.log(response);
        //     //     })
        //     //     .catch(function (error) {
        //     //       console.log(error);
        //     //     });
        //     // });

        //     let deleteTemp = [tempPath, resizedPath];

        //     fs.unlink(path, (err, deleted) => {
        //       if (err) {
        //         console.log('Error on file delete: ', err);
        //       } else {
        //         console.log('Temp file deleted', deleted);
        //       }
        //     }); 

        //   })
        //   .catch((err) => {
        //     console.log('Failure error: ', err);
        //     return res.status(500).end('Upload to s3 failed');
        //   });

      }
    });
};


// response['clarifaiKeywords'] = [ 'woman',
//                                   'portrait',
//                                   'chocolate',
//                                   'girl',
//                                   'candy',
//                                   'temptation',
//                                   'enjoyment',
//                                   'cute',
//                                   'food',
//                                   'people',
//                                   'happiness',
//                                   'adult',
//                                   'indulgence',
//                                   'cake',
//                                   'birthday',
//                                   'joy',
//                                   'young',
//                                   'pretty',
//                                   'sweet',
//                                   'fun' ];



// {
//   id: photoId, // sent as params
//   path: path, // generated by photo id
//   url: url, // generated by 
//   clarifaiKeywords: [], // generated by clarifai
//   gps: {lat: coordinate, long: coordinate} // generated by metadata
// }




// DONE FROM S3: { ETag: '"5e3d9d526c8fd64285f9f8b88fef1850"',
//   Location: 'https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/Marce_smaller.jpg',
//   key: '000/Marce_smaller.jpg',
//   Key: '000/Marce_smaller.jpg',
//   Bucket: 'preposterous-kumquat.photos' }



/*************** Node modules **********************/
// EXIFIMAGE extracts GPS if there
// SizeOf turns the resolution of item
// imagemagick should resize

/*************** flow of action **********************/
// check if there is any metadata on the photo
// if no gps data 
  // send to the user that they must select a location
// else check the resolution
// check if photo has a dimension greater than 720x720
// if greater than 720 then resize
// return photopath


// { fieldname: 'image',
//   originalname: 'Marce.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'tmp/',
//   filename: '4b435e9bb37f2f00cdd5e1764d66e264',
//   path: 'tmp/4b435e9bb37f2f00cdd5e1764d66e264',
//   size: 354715 }
