var babel = require('gulp-babel'),
    del   = require('del'),
    gulp  = require('gulp');


var DIR_SRC = './src',
    DIR_TARGET = './target';


var config = {
  js: {
    src: DIR_SRC + '/**/*.js'
  }
};


gulp.task('js', function js() {
  return gulp.src(config.js.src)
    .pipe(babel())
    .pipe(gulp.dest('./target'));
});


gulp.task('clean:target', function(done){
  del(DIR_TARGET + '/*', done);
});


gulp.task('default', gulp.series('clean:target', 'js', function watch(){
  gulp.watch(config.js.src, gulp.task('js'));
}));
