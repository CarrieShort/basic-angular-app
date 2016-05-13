const angular = require('angular');
require(__dirname + '/../css/style.css');
const fightApp = angular.module('fightApp', []);
const baseUrl = 'http://localhost:3000';

const handleError = function(error) {
  console.log(error);
  this.errors  = (this.errors || []).push(error);
};

const deeplyClone = function(obj) {

};

fightApp.controller('DinosaursController', ['$http', function($http) {
  var vm = this;
  vm.dinosaurs = [];
  vm.getAll = () => {
    $http.get(baseUrl + '/api/dinosaurs')
      .then((res) => {
        vm.dinosaurs = res.data;
      }, handleError.bind(vm));
  };
  vm.createDino = () => {
    $http.post(baseUrl + '/api/dinosaurs', vm.newDino)
      .then((res) => {
        vm.dinosaurs.push(res.data);
        vm.newDino = null;
      }, handleError.bind(vm));
  };
  vm.removeDino = (dino) => {
    $http.delete(baseUrl + '/api/dinosaurs/' + dino._id)
      .then(() => {
        vm.dinosaurs.splice(vm.dinosaurs.indexOf(dino), 1);
      }, handleError.bind(vm));
  };
  vm.updateDino = (dino) => {
    $http.put(baseUrl + '/api/dinosaurs/' + dino._id, dino)
      .then(() => {
        dino.editing = false;
      }, handleError.bind(vm));
  };
  vm.startEdit = (dino) => {
    dino.editing = true;
    vm.backup = angular.fromJson(angular.toJson(dino));
  };
  vm.cancelEdit = (dino) => {
    dino.editing = false;
    for (var key in dino) {
      dino[key] = angular.fromJson(angular.toJson(vm.backup[key]));
    }
  };
}]);
