var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here. When 'gulp' is run in the terminal this will execute.

  //Image Task
  //compress
    gulp.task('image', function() {
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img/gulped'));
  });

    //minify JS
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minjs'));

    gulp.src('views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('views/minJs'));


});
