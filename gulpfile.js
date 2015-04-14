var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require( 'gulp-minify-css' );
var plumber      = require('gulp-plumber');
var webserver    = require('gulp-webserver');

var AUTOPREFIXER_BROWSERS = [
  'last 2 version', 'Explorer >= 10', 'android >= 4.0'
];

/* sass task */
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass( { errLogToConsole: true } ))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/'));
});


/* webserver task */
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9000,
      livereload: true,
      directoryListing: true,
      open: false
    }));
});


/* watch task */
gulp.task('watch', function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});


/* default task */
gulp.task('default', ['webserver', 'watch']);