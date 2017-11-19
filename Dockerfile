FROM node:9.1

RUN mkdir /front
WORKDIR /front

COPY package.json .

COPY . /front/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

