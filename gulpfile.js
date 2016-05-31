const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
var children = [];
const mongoUri = 'mongodb://localhost/test_server';
const secret = 'testsecret';
var Server = require('karma').Server;
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const neat = require('node-neat').includePaths;

gulp.task('sass', () => {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass({
      includePaths: ['sass'].concat(neat)
    }).on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('webpack:dev', ['sass'], () => {
  return gulp.src('./app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.css$/,
          loader: 'style!css'
        }]
      },
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', ['webpack:dev'], () => {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.css$/,
          loader: 'style!css'
        }, {
          test: /\.html$/,
          loader: 'html'
        }]
      },
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', ['webpack:test'], () => {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:app', () => {
  return gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:server', () => {
  return gulp.src('server.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  return gulp.src('./test/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('startservers:selenium', ['static:dev'], (done) => {
  var server = cp.spawn('webdriver-manager', ['start']);
  var run = true;
  children.push(server);
  server.stdout.on('data', () => {
    if (run) {
      run = false;
      console.log('selenium started');
      done();
    }

  });
});
gulp.task('startservers:app', ['startservers:selenium'], (done) => {
  var server = cp.spawn('node', ['server.js']);
  var run = true;
  children.push(server);
  server.stdout.on('data', () => {
    if (run) {
      run = false;
      console.log('app started');
      done();
    }
  });
});

gulp.task('startservers:mongod', ['startservers:app'], (done) => {
  var server = cp.spawn('mongod', ['--dbpath=../rest_api/carrie-short/db']);
  var run = true;
  children.push(server);
  server.stdout.on('data', () => {
    if (run) {
      console.log('mongod started');
      run = false;
      done();
    }
  });
});

gulp.task('startservers:rest', ['startservers:mongod'], (done) => {
  children.push(cp.fork('../rest_api/carrie-short', [], {
    env: {
      MONGO_URI: mongoUri,
      APP_SECRET: secret
    }
  }));
  console.log('rest started');
  done();
});

gulp.task('protractor', ['startservers:rest'], () => {
  return gulp.src('./test/integration/*.js')
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGINT');
      });
      cp.exec('kill -9 ' + (children[0].pid + 1));
    });
});

gulp.task('karma', ['protractor'], (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
gulp.task('lint', ['lint:app', 'lint:server']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['lint', 'karma']);
