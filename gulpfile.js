var babel      = require('gulp-babel'),
    babelify   = require('babelify'),
    browserify = require('browserify'),
    del        = require('del'),
    gulp       = require('gulp'),
    vinyl      = require('vinyl-source-stream'),
    watchify   = require('watchify');


var DIR_SRC = './src',
    DIR_TARGET = './target';


var config = {
  js: {
    options: {
      cache   : {},
      entries : DIR_SRC +'/main.js',
      noparse : [],
      packageCache : {}
    },

    //required: [],

    dest: DIR_TARGET,
    outfile: 'main.js'
  }
};


function compileJs(watch, done) {
  var bundler = browserify(config.js.options);

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', compile);
  }

  function compile() {
    bundler
      .transform(babelify)
      .bundle()
      .pipe(vinyl(config.js.outfile))
      .pipe(gulp.dest(config.js.dest))
      .on('end', function(){
        if (done) done();
      });
  }

  compile();
}


gulp.task('js', function js(done){
  compileJs(false, done);
});


gulp.task('clean:target', function(done){
  del(DIR_TARGET + '/*', done);
});


gulp.task('default', gulp.series('clean:target', function watch(){
  compileJs(true);
}));
