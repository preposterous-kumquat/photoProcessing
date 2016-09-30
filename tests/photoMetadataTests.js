const expect = require('chai').expect;
const request = require('request');
const photoMetadata = require('../server/photoProcessers/photoMetadata.js');
const fs = require('fs');

describe('photoMetadata function', () => {
  it('photoMetadata should be a function', () =>{
    expect(photoMetadata).to.be.a('function');
  })
  it('photoMetadata should return a null if no GPS data present', (done) => {
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
        expect(gps.lat).to.be.a('number'); 
        expect(gps.lat).to.exist; 
        expect(gps.long).to.be.a('number'); 
        expect(gps.long).to.exist;   
        done()
      });
  });
})

