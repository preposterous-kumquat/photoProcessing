const clarifaiKeys = require('../../api-key.js').clarifai;
const axios = require('axios');
const request = require('request');

const Clarifai = require('clarifai');


const app = new Clarifai.App(
  `${clarifaiKeys.clientId}`,
  `${clarifaiKeys.clientSecret}`
);

let token = null;
let expireTime = null;


app.getToken()
  .then((response) => {
    token = response.access_token;
    expireTime = new Date(response.expireTime);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  });

// function return the classes as an array
module.exports = (url, callback) => {
  console.log('ENTERED CLARIFAI API');
  if (!token || Date.now() > expireTime) {
    console.log('ENTERED CLARIFAI API');
    app.getToken()
      .then((response) => {
        token = response.access_token;
        expireTime = new Date(response.expireTime);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }).then(() => {
        axios.get(url)
          .then((res) => {
            callback(null, res.data.results[0].result.tag.classes);
          })
          .catch((err) => {
            callback(err);
          });
      });
  } else {
    axios.get(url)
      .then((res) => {
        callback(null, res.data.results[0].result.tag.classes);
      })
      .catch((err) => {
        callback(err);
      });
  }
};




  // .then((token) => {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   // return axios.get('https://api.clarifai.com/v1/tag/?url=http://im.rediff.com/money/2013/feb/12ice-cream12.jpg');
  // }).then((res) => {
  //   console.log(res.data.results[0], 'RESULT====================');
  //   console.log(res.data.results[0].result, 'RESULT OBJECT ================++++');
  //   console.log(res.data.results[0].result.tag.classes, 'RESULTS OBJECT ================++++>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  // }).catch((err) => {
  //   console.log(err);
  // });

// axios.post('https://api.clarifai.com/v1/token/', {
//   client_id: clarifaiKeys.clientId,
//   client_secret: clarifaiKeys.clientSecret,
//   grant_type: 'client_credentials'
// }).then((res) => {

//   console.log('RESPONSE=============', res, 'RESPONSE================')
// }).catch((err) => {
//   console.log(err)
// });
// var config = {
//   headers: {'Authorization': 'Bearer ' + token}
// };

// axios.get('https://api.github.com/users/codeheaven-io', config);
// axios.post('/save', { firstName: 'Marlon' }, config);



// curl -X POST "https://api.clarifai.com/v1/token/" \
//   -d "client_id={client_id}" \
//   -d "client_secret={client_secret}" \
//   -d "grant_type=client_credentials"

/*
http://im.rediff.com/money/2013/feb/12ice-cream12.jpg
[ 'woman',
  'portrait',
  'chocolate',
  'girl',
  'candy',
  'temptation',
  'enjoyment',
  'cute',
  'food',
  'people',
  'happiness',
  'adult',
  'indulgence',
  'cake',
  'birthday',
  'joy',
  'young',
  'pretty',
  'sweet',
  'fun' ]
{ clusters: [ { id: '39_226', num_clusters: 0 } ] }
*/
