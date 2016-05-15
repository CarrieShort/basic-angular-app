const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
var children = [];
const mongoUri = 'mongodb://localhost/test_server';
const secret = 'testsecret';

gulp.task('webpack:dev', () => {
  return gulp.src('./app/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css' }
      ]
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
        loaders: [
          { test: /\.css$/, loader: 'style!css' }
        ]
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

gulp.task('startservers:test', ['static:dev'], () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('../rest_api/carrie-short', [], { env: {
    MONGO_URI: mongoUri,
    APP_SECRET: secret
  } }));
});

gulp.task('protractor', ['startservers:test'], () => {
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

gulp.task('test', ['protractor']);
gulp.task('lint', ['lint:app', 'lint:server']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['lint', 'test']);
