"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso');

gulp.task('build', function() {
    gulp.src(
        [
           './src/vendor/angular/angular.js',
           './src/vendor/**/*.js', '!./src/vendor/**/*.min.js',
           './src/app/js/app.js',
           './src/app/js/**/*.js',
           './src/app/js/config.js'
        ])
       .pipe(concat('app.js'))
       //.pipe(uglify())
       .pipe(gulp.dest('./src/public'));

    gulp.src(
        [
            './src/app/**/*.gif',
            './src/app/**/*.jpg',
            './src/app/**/*.png'
        ])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./src/public'));

    gulp.src(
        [
            './src/vendor/fira/**/*.eot',
            './src/vendor/fira/**/*.woff'
        ], { base: './src/vendor/fira/' })
        .pipe(gulp.dest('./src/public'));

    gulp.src(
        [
            './src/vendor/fira/fira.css',
            './src/css/*.css',
            './src/app/**/*.css'
        ])
        .pipe(concat('app.css'))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest('./src/public'));
});
