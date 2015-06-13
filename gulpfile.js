var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    Builder = require('systemjs-builder'),
    del = require('del'),
    gulp = require('gulp'),
    path = require('path');


gulp.task('bundle', function bundle(done){
  var builder = new Builder({
    baseURL: 'file:' + path.resolve('./src')
  });

  builder
    .build('main.js', './target/bundled/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Build error');
        console.log(error);
        done();
      }
    );
});


gulp.task('executable', function bundle(done){
  var builder = new Builder({
    baseURL: 'file:' + path.resolve('./src')
  });

  builder
    .buildSFX('entry.js', './target/executable/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Build error');
        console.log(error);
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


gulp.task('default', gulp.series('bundle', 'executable', 'transpile', function watch(){
  gulp.watch('./src/**/*.js', gulp.task('transpile'));
}));
