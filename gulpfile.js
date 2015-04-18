var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var plumber      = require('gulp-plumber');
var webserver    = require('gulp-webserver');
var source       = require('vinyl-source-stream');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');

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


/* js task */
gulp.task('js', function() {
  return browserify({
    entries: ['./js/app.js']
  })
  .bundle()
  .pipe(plumber())
  .pipe(source('app.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('js'));
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
  gulp.watch(['js/app.js'], ['js']);
});


/* default task */
gulp.task('default', ['webserver', 'watch']);