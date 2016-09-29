const aws = require('aws-sdk');
const amazonS3Keys = require('../../api-key.js').amazon_S3;
const Promise = require('bluebird');

aws.config.update({
  accessKeyId: amazonS3Keys.aws_access_key_id,
  secretAccessKey: amazonS3Keys.aws_secret_access_key,
  region: amazonS3Keys.region
});

const s3 = new aws.S3();
Promise.promisifyAll(Object.getPrototypeOf(s3));

module.exports = {
  s3: s3,
  bucket: amazonS3Keys.bucket
};

// // Route for the upload
// app.post("/files/upload", upload.single("form-field-name"), function (req, res) {
//   var fileInfo = console.log(req.file);
//   var fileStream = fs.readFileSync(fileInfo.path);
//   var options = {
//     Bucket: 'xxx',
//     Key: 'yyy/'+fileName,
//     Body: fileStream
//   };

//   s3.upload(options, function (err) {
//     // Remove the temporary file
//     fs.removeFileSync("tmp/"+fileInfo.path); // ideally use the async version
//     if (err) {
//       return res.status(500).end("Upload to s3 failed");
//     }
//     res.status(200).end("File uploaded");
//   });
// });

// /**
//  * Authentication middleware
//  *
//  * It will be called for any routes starting with /files
//  */
// app.use("/files", function (req, res, next) {
//   var authorized = true; // use custom logic here
//   if (!authorized) {
//     return res.status(403).end("not authorized");
//   }
//   next();
// });

// // Route for the upload
// app.post("/files/upload", upload.single("form-field-name"), function (req, res) {
//   var fileInfo = console.log(req.file);
//   var fileStream = fs.readFileSync(fileInfo.path);
//   var options = {
//     Bucket: 'xxx',
//     Key: 'yyy/'+fileName,
//     Body: fileStream
//   };

//   s3.upload(options, function (err) {
//     // Remove the temporary file
//     fs.removeFileSync("tmp/"+fileInfo.path); // ideally use the async version
//     if (err) {
//       return res.status(500).end("Upload to s3 failed");
//     }
//     res.status(200).end("File uploaded");
//   });
// });

// // Route for the download
// app.get("/files/download/:name", function (req, res) {
//   var fileName = req.params.name;
//   if (!fileName) {
//     return res.status(400).end("missing file name");
//   }
//   var options = {
//     Bucket: 'xxx',
//     Key: 'yyy/'+fileName
//   };
//   res.attachment(fileName);
//   s3.getObject(options).createReadStream().pipe(res);
// });



// export a function give a file path and res
  // save to s3
  // send res with success