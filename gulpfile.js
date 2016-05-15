const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;
const protractor = require('gulp-protractor').protractor;

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

gulp.task('webpack:test', () => {
  gulp.src('test/unit/test_entry.js')
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

gulp.task('static:dev', ['webpack:dev'], () => {
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

gulp.task('start:server', ['static:dev'], () => {
  exec('node server.js');
  exec('webdriver-manager start');
});

gulp.task('protractor', ['start:server'], () => {
  return gulp.src('./test/integration/*.js')
  .pipe(protractor({
    configFile: 'test/integration/config.js'
  }));
});

gulp.task('test', ['protractor']);
gulp.task('lint', ['lint:app', 'lint:server']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['lint', 'test']);
