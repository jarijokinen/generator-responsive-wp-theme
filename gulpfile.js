'use strict';

const gulp = require('gulp');
const nsp = require('gulp-nsp');
const path = require('path');

gulp.task('nsp', function (cb) {
  nsp({ package: path.resolve('package.json') }, cb);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', []);
