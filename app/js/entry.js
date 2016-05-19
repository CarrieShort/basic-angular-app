const angular = require('angular');
require(__dirname + '/../css/style.css');
const fightApp = angular.module('fightApp', []);
const baseUrl = 'http://localhost:3000';

require('./directives')(fightApp);

const handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

fightApp.controller('DinosaurController', ['$http', function($http) {
  var vm = this;
  vm.dinosaurs = [];
  console.log('controller happens');
  vm.getAll = () => {
    console.log('get all happens');
    $http.get(baseUrl + '/api/dinosaurs')
      .then((res) => {
        vm.dinosaurs = res.data;
        console.log('i see dinos', vm.dinosaurs);
      }, handleError.bind(vm));
  };
}]);
