FROM node:onbuild
MAINTAINER julie.truong.lieu@gmail.com

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm
RUN apt-get clean
RUN npm install --global nodemon
RUN npm install --global babel babel-cli

COPY . src/
RUN cd src/ && npm install
