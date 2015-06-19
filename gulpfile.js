var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    Builder = require('systemjs-builder'),
    del = require('del'),
    gulp = require('gulp'),
    merge = require('merge2'),
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


var typescriptProject = typescript.createProject({
  module: 'system',
  target: 'es5',
  typescript: require('typescript')
  //declarationFiles: true,
  //noExternalResolve: true
});


gulp.task('scripts', function() {
  var tsResult = gulp.src('lib/*.ts')
    .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/js'))
  ]);
});


gulp.task('transpile:ts', function(){
  var tsResult = gulp.src(['./src/ts/*.ts'])
    .pipe(typescript(typescriptProject));

  return tsResult.js.pipe(gulp.dest('./target/ts/transpiled'));

  // Merge the two output streams, so this task is finished when the IO of both operations are done.
  //return merge([
  //  tsResult.dts.pipe(gulp.dest('release/definitions')),
  //  tsResult.js.pipe(gulp.dest('release/js'))
  //]);
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
  gulp.watch('./src/es5/*.js', gulp.task('transpile'));
  gulp.watch('./src/ts/*.ts', gulp.task('transpile:ts'));
}));
