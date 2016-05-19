const handleError = require('../../lib').handleError;
const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;
module.exports = function(app) {
  app.controller('DinosaurController', ['$http', function($http) {
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
      vm.dinoBackup = copy(dino);
    };
    vm.cancelEdit = (dino) => {
      dino.editing = false;
      for (var key in vm.dinoBackup) {
        if (vm.dinoBackup.hasOwnProperty(key)) {
          dino[key] = vm.dinoBackup[key];
        }
      }
    };
  }]);
};
