var angular = require('angular');
require(__dirname + '/../css/style.css');
angular.module('demoApp', [])
.controller('CommentController', function() {
  var vm = this;
  vm.msg = '';
  vm.delete = function() {
    return vm.msg = '';
  };
});
