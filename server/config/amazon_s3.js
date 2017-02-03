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

