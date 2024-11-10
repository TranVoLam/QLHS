'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

const buildMainStyles = () => 
    gulp.src('./src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))

exports.watch = () => {
    gulp.watch('./src/sass/**/*.scss', buildMainStyles)
}
