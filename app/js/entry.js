const angular = require('angular');
require(__dirname + '/../css/style.css');

const baseUrl = 'http://localhost:3000';

const handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

const deeplyClone = function(obj) {
  var temp = obj.constructor();
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = obj[key];
    }
  }
  return temp;
};

angular.module('fightApp', [])
.controller('DinosaursController', ['$http', function($http) {
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
    vm.dinoBackup = deeplyClone(dino);
  };
  vm.cancelEdit = (dino) => {
    dino.editing = false;
    for (var key in vm.dinoBackup) {
      if (vm.dinoBackup.hasOwnProperty(key)) {
        dino[key] = vm.dinoBackup[key];
      }
    }
  };
}])
.controller('PoliticiansController', ['$http', function($http) {
  var vm = this;
  vm.politicians = [];
  vm.getAll = () => {
    $http.get(baseUrl + '/api/politicians')
      .then((res) => {
        vm.politicians = res.data;
      }, handleError.bind(vm));
  };
  vm.createPolitician = () => {
    $http.post(baseUrl + '/api/politicians', vm.newPolitician)
      .then((res) => {
        vm.politicians.push(res.data);
        vm.newPolitician = null;
      }, handleError.bind(vm));
  };
  vm.removePolitician = (politician) => {
    $http.delete(baseUrl + '/api/politicians/' + politician._id)
      .then(() => {
        vm.politicians.splice(vm.politicians.indexOf(politician), 1);
      }, handleError.bind(vm));
  };
  vm.updatePolitician = (politician) => {
    $http.put(baseUrl + '/api/politicians/' + politician._id, politician)
      .then(() => {
        politician.editing = false;
      }, handleError.bind(vm));
  };
  vm.startEdit = (politician) => {
    politician.editing = true;
    vm.poliBackup = deeplyClone(politician);
  };
  vm.cancelEdit = (politician) => {
    politician.editing = false;
    for (var key in vm.poliBackup) {
      if (vm.poliBackup.hasOwnProperty(key)) {
        politician[key] = vm.poliBackup[key];
      }
    }
  };
}]);
