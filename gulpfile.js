var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    Builder = require('systemjs-builder'),
    del = require('del'),
    gulp = require('gulp'),
    path = require('path'),
    typescript = require('gulp-typescript');


function builder(ts) {
  var dir = ts ? './target/ts/transpiled' : './src/es5';

  var options = {
    baseURL: 'file:' + path.resolve(dir),
    defaultJSExtensions: true
  };

  return new Builder(options);
}


//===============================================
// ES5
//===============================================

gulp.task('bundle', function bundle(done){
  builder()
    .build('test.js', './target/es5/bundled/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Builder Error:', error);
        done();
      });
});


gulp.task('executable', function bundle(done){
  builder()
    .buildSFX('auto-test.js', './target/es5/executable/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Builder Error:', error);
        done();
      });
});


gulp.task('transpile', function transpile(){
  return gulp.src(['./src/es5/*.js', '!./src/es5/auto-test.js'])
    .pipe(babel({modules: 'system'}))
    .pipe(gulp.dest('./target/es5/transpiled'));
});


//===============================================
// TypeScript
//===============================================

gulp.task('bundle:ts', function(done){
  builder(true)
    .build('test.js', './target/ts/bundled/main.js')
    .then(
    function(){
      done();
    },
    function(error){
      console.log('Builder Error:', error);
      done();
    });
});


gulp.task('executable:ts', function bundle(done){
  builder(true)
    .buildSFX('auto-test.js', './target/ts/executable/main.js')
    .then(
      function(){
        done();
      },
      function(error){
        console.log('Builder Error:', error);
        done();
      });
});


gulp.task('transpile:ts', function(){
  var tsResult = gulp.src(['./src/ts/*.ts'])
    .pipe(typescript({
      module: 'system',
      target: 'es5',
      //noExternalResolve: true,
      //noImplicitAny: true,
      //out: 'output.js',
      typescript: require('typescript')
    }));

  return tsResult.js.pipe(gulp.dest('./target/ts/transpiled'));
});


//===============================================
//
//===============================================

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


gulp.task('build:es5', gulp.parallel('bundle', 'executable', 'transpile'));
gulp.task('build:ts', gulp.series('transpile:ts', 'bundle:ts', 'executable:ts'));
gulp.task('build', gulp.parallel('build:es5', 'build:ts'));


gulp.task('default', gulp.series('build', function watch(){
  gulp.watch('./src/**/*.js', gulp.task('transpile'));
}));
