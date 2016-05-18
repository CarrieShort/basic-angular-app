const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
var children = [];
const mongoUri = 'mongodb://localhost/test_server';
const secret = 'testsecret';
var Server = require('karma').Server;

gulp.task('webpack:dev', () => {
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
  children.push(server);
  server.stdout.on('end', () => {
    console.log('server up');
    done();
  });
});
gulp.task('startservers:app', ['startservers:selenium'], (done) => {
  var server = cp.spawn('node', ['server.js']);
  children.push(server);
  server.stdout.on('end', () => {
    console.log('app server up');
    done();
  });
});

gulp.task('startservers:mongod', ['startservers:app'], (done) => {
  var server = cp.spawn('mongod', ['--dbpath=../rest_api/carrie-short/db']);
  children.push(server);
  server.stdout.on('end', () => {
    console.log('mongod up');
    done();
  });
});

gulp.task('startservers:rest', ['startservers:mongod'], (done) => {
  children.push(cp.fork('../rest_api/carrie-short', [], { env: {
    MONGO_URI: mongoUri,
    APP_SECRET: secret
  } }));
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
