const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs');

module.exports = (req, res) => {
  let tempPath = `${__dirname}/../${req.file.path}`;
  gm(tempPath)
    .identify((err, done) => {
      if (err) {
        res.status(415).json({valid: false});
        fs.unlink(tempPath);
      } else {
        res.json({valid: true});
        fs.unlink(tempPath);
      }
    });
};