module.exports = {
  generateFilePath,
};

/****** PUBLIC FUNCTIONS ******/
function generateFilePath (num, charBlock) {
  let padded = pad(num, 12);
  let path = '';
  for (let i = 0; i < padded.length; i++) {
    if (i !== 0 && i % charBlock === 0) {
      path += '/';
    }
    path += padded[i];
  }
  return `${path}/${padded}.jpg`;
}

function pad (num, padding) {
  paddedNum = num.toString();
  while (paddedNum.length < padding) {
    paddedNum = `0${paddedNum}`;
  }
  return paddedNum;
}
