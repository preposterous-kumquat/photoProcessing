const expect = require('chai').expect;
const request = require('request');
const photoMetadata = require('../server/photoProcessers/photoMetadata.js');
const fs = require('fs');

describe('photoMetadata function', () => {
  it('photoMetadata should be a function', () =>{
    expect(photoMetadata).to.be.a('function');
  })
  it('photoMetadata should return a null if no GPS data present', (done) => {
    console.log(`${__dirname}/test-photos/HongKong_icecream.jpg`)
    photoMetadata(`${__dirname}/test-photos/HongKong_icecream.jpg`)
      .then((gps) => {
        expect(gps).to.equal(null);
        done();    
      });
  });
  it('photoMetadata should if present should be an object', (done) => {
    photoMetadata(`${__dirname}/test-photos/Marce.jpg`)
      .then((gps) => {
        expect(gps).to.be.a('object');    
        done()
      });
  });
  xit('photoMetadata should return the correct path', () => {
    let photoId = 12345;
    let charBlock = 3;
    let path = photoMetadata(photoId, charBlock)
    expect(path).to.equal('000/000/012/345/000000012345.jpg')
  })
})

