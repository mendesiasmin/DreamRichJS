#!/bin/sh

npm install
npm install -g gulp
npm install gulp gulp-uglify gulp-concat gulp-rename --save-dev

exec "$@"
