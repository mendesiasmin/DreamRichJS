FROM node:9.1

RUN mkdir /front
WORKDIR /front

COPY package.json .

RUN npm install --global npm@3.7.5

COPY . /front/

