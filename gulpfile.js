// sudo npm install -g npm gulp jshint
// sudo npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-concat gulp-notify gulp-rename --save-dev
// sudo npm install jshint gulp-jshint gulp-uglify --save-dev
// sudo npm install gulp-cache gulp-imagemin --save-dev

// sudo npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del

// Loads plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var nano = require('gulp-cssnano');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');


// Source and Destination Folders
var css_src = './assets/stylesheets/all.sass';
var js_src = './assets/javascripts/**/*.js';
var destination = './';

// Task to concat, uglify and minify sass files
gulp.task('styles', function() {
  sass(css_src)
  .pipe(autoprefixer('last 2 version'))
  .pipe(concat(destination))
  .pipe(rename('all.min.css'))
  .pipe(nano())
  .pipe(gulp.dest(destination))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Task to concat, uglify and minify javascript files
gulp.task('scripts', function() {
  gulp.src(js_src)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat(destination))
  .pipe(rename('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(destination))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// Task to optimize images
gulp.task('images', function() {
  return gulp.src('./assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./images/'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Main task
gulp.task('default', function() {
  gulp.start('scripts', 'styles', 'images');
});
