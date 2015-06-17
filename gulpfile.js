var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    Builder = require('systemjs-builder'),
    del = require('del'),
    gulp = require('gulp'),
    path = require('path');


function builder() {
  var builder = new Builder({
    baseURL: 'file:' + path.resolve('./src')
  });

  return builder;
}


gulp.task('bundle', function bundle(done){
  builder()
    .build('main.js', './target/bundled/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Build error:', error);
        done();
      }
    );
});


gulp.task('executable', function bundle(done){
  builder()
    .buildSFX('entry.js', './target/executable/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Build error:', error);
        done();
      }
    );
});


gulp.task('transpile', function transpile(){
  return gulp.src('./src/**/*.js')
    .pipe(babel({modules: 'system'}))
    .pipe(gulp.dest('./target/transpiled'));
});


gulp.task('sync', function(){
  browserSync
    .create()
    .init({
      browser: 'firefox',
      files: ['target/**/*', 'views/**/*'],
      port: 7000,
      server: {
        baseDir: '.'
      }
    });
});


gulp.task('build', gulp.parallel('bundle', 'executable', 'transpile'));


gulp.task('default', gulp.series('build', function watch(){
  gulp.watch('./src/**/*.js', gulp.task('transpile'));
}));
