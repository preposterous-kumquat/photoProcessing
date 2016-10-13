# [Lensity](https://github.com/preposterous-kumquat/preposterous-kumquat)

Photo Processing Micro-service for photo upload to Amazon S3 and keyword generation from Clarifai API

## Team
  - __Product Owner__: [Josphine Eng](https://github.com/ChirpingMermaid)
  - __Scrum Master__: [Julie Truong](https://github.com/Truong-Julie)
  - __Development Team Members__: [Brian Kilrain](https://github.com/bkilrain)

# photoProcessing

## Table of Contents

1. [Team](#team)
1. [Usage](#usage)
1. [Docker Development](#docker-development)
    1. [Build Image](#build-image)
1. [Local Development](#local-development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [API Key Set-UP](#api-key-set-up)
        1. [Create api-key.js](#create-api-key.js)
        1. [S3 access keys](#s3-access-keys)
        1. [Clarifai](#clarifai)
1. [Contributing](#contributing)

## Usage

- POST /photoProcessor/upload/:id: 
Web server from [Lensity](https://github.com/preposterous-kumquat/preposterous-kumquat) sends POST /photoProcessor/upload/:id request to photo-processor service. Multer looks for the form data name attribute 'photo' and a save to local disk storage. Photo is scraped for GPS metadata, saved to S3 and then send to Clarifai AI to generate list of keywords associated with the photo.

- POST /photoProcessor/validPhoto
Checks the if uploaded photo is in a valid format

## Docker Development

### Build Image

In root folder run:
```sh
docker build -t photo-processor:0.1 .
```

## Local Development

### Installing Dependencies
From within the root directory
```sh
npm install
brew install graphicsmagick
brew install imagemagick
nodemon
```

### API Key Set-Up:
#### Create api-key.js
Using 
```sh
Copy api-key-sample.js and rename to api-key.js
```
#### S3 access keys
* Set-up S3 account
* Obtain access keys, bucket and region
* Update api-key.js

#### Clarifai
* Obtain access keys [Clarifai](https://developer.clarifai.com/signup/)
* Update api-key.js




## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
