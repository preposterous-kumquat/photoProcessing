const photoMetaData = require('./photoMetadata.js');
const gm = require('gm').subClass({imageMagick: true});
const s3 = require('../config/amazon_s3.js').s3;
const bucket = require('../config/amazon_s3.js').bucket;
const fs = require('fs');
const generateFilePath = require('../config/helpers').generateFilePath;
const async = require('async');

module.exports = (req, res) => {
  let id = req.params.id;
  let path = generateFilePath(id);

  async.parallel({
    metadata: (callback) => {
      photoMetaData(`${__dirname}/../${req.file.path}`, (err, data) => {
        callback(null, data);
      });
    },
    // clarifai: (callback) => {

    // }
  }, (err, results) => {
    if (err) {
      console.error('ERROR: ', err);
    }
    console.log('DONE', results);
  });


  res.send(req.file);

  /*************************** PHOTO API **********************************/
    // send the photo to the api and return that data when ready


  /************************* PHOTO METADATA *******************************/
  // let data = photoMetaData(`${__dirname}/../${req.file.path}`, (err, data) => {
  //   console.log(data, '<--- photo metadata');
  //   if (data.coordinates === 'No GPS data') {
  //     console.log('metadata does not exist!');
  //   }
  // });

  /**************** RESIZING PHOTOS & SAVING PHOTO ************************/
  // let tempPath = `${__dirname}/../${req.file.path}`;
  // let fileName = req.file.originalname.split('.')[0];
  // let fileExt = req.file.originalname.split('.')[1];
  // let resizedPath = `${__dirname}/temp/${fileName}_smaller.${fileExt}`;


  // gm(tempPath)
  //   .resize(720, 720)
  //   .write(resizedPath, (err, done) => {
  //     if (err) { 
  //       console.log(`Error in resizing ${err}`);
  //     } else {
  //       console.log(`Photo resized ${done}`);


        // let deleteTemp = [tempPath, resizedPath];
        // deleteTemp.forEach((path) => {
        //   fs.unlink(path, (err) => {
        //     if (err) {
        //       console.log('Error on file delete: ', err);
        //     } else {
        //       console.log('Temp file deleted');
        //     }
        //   }); 
        // });

        // let fileStream = fs.readFileSync(resizedPath);

        // let options = {
        //   Bucket: bucket,
        //   Key: `000/${req.file.originalname}`,
        //   Body: fileStream
        // };


        // s3.upload(options, function (err, upload) {
        //   console.log('entered s3 function');
        //   if (err) {
        //     console.log('Failure error: ', err);
        //     return res.status(500).end('Upload to s3 failed');
        //   } else {
        //     console.log('DONE FROM S3:', upload);

        //     // url = upload.S3.Location
        //     // eTag = upload.S3.ETag

        //     res.status(200).end('File uploaded');
        //     let deleteTemp = [tempPath, resizedPath];

        //     fs.unlink(path, (err, deleted) => {
        //       if (err) {
        //         console.log('Error on file delete: ', err);
        //       } else {
        //         console.log('Temp file deleted', deleted);
        //       }
        //     }); 
            
        //   }
        // }); 

    //   }
    // });
};

// Need to create a file to hash the file names



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
