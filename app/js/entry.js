const angular = require('angular');
require(__dirname + '/../css/style.css');
const demoApp = angular.module('demoApp', [])
.controller('Comment', function() {
  this.msg = '';
  this.delete = function() {
      return this.msg = '';
  };
});
