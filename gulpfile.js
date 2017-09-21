var gulp = require('gulp'),
imagemin = require('gulp-imagemin');



gulp.task('default', function() {
  // place code for your default task here


});

//Image Task
//compress
gulp.task('image', function() {
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('img/gulped'));
});
