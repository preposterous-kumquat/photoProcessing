const expect = require('chai').expect;
const request = require('request');
const generateFilePath = require('../server/config/helpers.js').generateFilePath;

describe('generateFilePath function', () => {
  it('generateFilePath should be a function', () =>{
    expect(generateFilePath).to.be.a('function');
  })
  it('generateFilePath should return a string', () => {
    let path = generateFilePath(12345,3)
    expect(path).to.be.a('string');    
  })
  it('generateFilePath should return create directories', () => {
    let photoId = 12345;
    let charBlock = 3;
    let path = generateFilePath(photoId, charBlock)
    expect(path).to.contain('/')
  })
  it('generateFilePath should return the correct path', () => {
    let photoId = 12345;
    let charBlock = 3;
    let path = generateFilePath(photoId, charBlock)
    expect(path).to.equal('000/000/012/345/000000012345.jpg')
  })
})
