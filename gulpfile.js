const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

function styling() {
  return gulp
    .src('./src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer()) 
    .pipe(gulp.dest('./docs/css/')) // output uncompressed css file
    .pipe(cssnano())
    .pipe(rename(function (path) {
      if (path.extname === '.css') {
        path.basename += '.min'
      }
    }))
    .pipe(sourcemaps.write('./')) 
    .pipe(gulp.dest('./docs/css/')) // output compressed css file
}

function server() {
  browserSync.init({
      server: {
          baseDir: './docs'
      }
  })
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch('./src/style/**/*.scss', styling);
  gulp.watch('./docs/', reload);
}

gulp.task(
  'default', 
  gulp.series(
    gulp.parallel(server, watch)
  )
)