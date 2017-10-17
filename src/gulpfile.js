var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
uglify = require('gulp-uglify'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
htmlmin = require('gulp-htmlmin');



gulp.task('default', function() {
  // place code for your default task here. When 'gulp' is run in the terminal this will execute.

//Minify HTML in src
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../dist'));

    gulp.src('views/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('../dist/views/'));


  //Minify CSS in src
  gulp.src('css/*.css')
  .pipe(cssmin())
  .pipe(gulp.dest('../dist/css'))

    //Minify CSS in src/view
    gulp.src('views/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('../dist/views/css'))

  //Compress Images src
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('../dist/img'))

    //Compress Images src/views
    gulp.src('views/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('../dist/views/img'))


    //minify JS in src

    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../dist/js'));

    //minify JS in src/views
    gulp.src('views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../dist/views/js'));



});
