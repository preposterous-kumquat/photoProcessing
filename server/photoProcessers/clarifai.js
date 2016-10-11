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
let keywordsUrl = `https://api.clarifai.com/v1/tag/?url=`
let nsfwUrl = `https://api.clarifai.com/v1/tag/?model=nsfw-v1.0&url=`

let checkToken = () => {
  if (!token || Date.now() > expireTime) {
    console.log('GENERATING TOKEN');
    return getToken(); 
  } else {
    return true;
  }
};

let getToken = () => { app.getToken()
  .then((response) => {
    token = response.access_token;
    expireTime = new Date(response.expireTime);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  });
};

getToken();

// function return the classes as an array
module.exports = {
  keywords: (url, callback) => {
    url = `${keywordsUrl}${url}`;
    if (checkToken()) {
      axios.get(url)
        .then((res) => {
          console.log('here is my res data', res.data.results[0].result.tag.classes);
          callback(null, res.data.results[0].result.tag.classes);
        })
        .catch((err) => {
          callback(err);
        });
    } else {
      console.log('Did not work');
      callback('did not work')
    }
  },
  nsfw: (url, callback) => {
    url = `${nsfwUrl}${url}`;
    console.log('got into nsfw', url)
    if (checkToken()) {
      console.log('Starting axios')
      axios.get(url)
        .then((res) => {
          console.log('RESPONSE FROM NSFW', res.data.results[0].result.tag);
          console.log('NSFW REQUEST 1:', res.data.results[0].result.tag.classes[0], 'RATING',res.data.results[0].result.tag.probs[0]);
          console.log('NSFW REQUEST 2:', res.data.results[0].result.tag.classes[1], 'RATING',res.data.results[0].result.tag.probs[1]);
          callback(null, [[res.data.results[0].result.tag.classes[0], res.data.results[0].result.tag.probs[0]], [res.data.results[0].result.tag.classes[1],res.data.results[0].result.tag.probs[1]]]);
        })
        .catch((err) => {
          callback(err);
        });
    } else {
      console.log('NSFW REQUEST DID NOT WORK');
      callback('NSFW REQUEST DID NOT WORK ---> CALLBACK')
    }

  },
  train: (req, res) => {
    let start = req.body.firstNum;
    let urls = [];
    batchSize = req.body.batchSize;
    for (let i = start; i < start + batchSize; i++) {
      urls.push("https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/training/first+4500/im" + i + '.jpg')
    }
    url = `https://api.clarifai.com/v1/tag/?url=` + urls.join('&url=');
    console.log(url)
    if (checkToken()) {
      axios.get(url)
        .then((response) => {
          let trainingCorpus = response.data.results.map( (item, index) => {
            let id = 'td_' + (index + start);
            return {
              id: id,
              tokens: item.result.tag.classes
            };
          });
          res.send(trainingCorpus);
        })
        .catch((err) => {
          console.log(err);
      });
    } else {
      console.log('Did not work');
    }
  },
}


// keywords: (url, callback) => {
//   url = `${keywordsUrl}${url}`;
//   console.log('ENTERED CLARIFAI API, here is my url', url);
//   if (!token || Date.now() > expireTime) {
//     console.log('GENERATING TOKEN');
//     app.getToken()
//       .then((response) => {
//         token = response.access_token;
//         expireTime = new Date(response.expireTime);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         console.log('TOKEN: ', token);
//       }).then(() => {
//         axios.get(url)
//           .then((res) => {
//             console.log('here is my res data', res.data.results[0].result.tag.classes);
//             callback(null, res.data.results[0].result.tag.classes);
//           })
//           .catch((err) => {
//             callback(err);
//           });
//       });
//   } else {
//     axios.get(url)
//       .then((res) => {
//         console.log('here is my res data', res.data.results[0].result.tag.classes);
//         callback(null, res.data.results[0].result.tag.classes);
//       })
//       .catch((err) => {
//         console.log('I have an error, on get', err);
//         callback(err);
//       });
//   }
// },


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
