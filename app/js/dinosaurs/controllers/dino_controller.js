const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;
module.exports = function(app) {
  app.controller('DinosaurController', ['$http', 'csHandleError', function($http, csHandleError) {
    var vm = this;
    vm.dinosaurs = [];
    vm.errors = [];
    vm.getAll = () => {
      $http.get(baseUrl + '/api/dinosaurs')
        .then((res) => {
          vm.dinosaurs = res.data;
        }, csHandleError(vm.errors, 'could not retrieve dinosaurs'));
    };
    vm.createDino = () => {
      $http.post(baseUrl + '/api/dinosaurs', vm.newDino)
        .then((res) => {
          vm.dinosaurs.push(res.data);
          vm.newDino = null;
        }, csHandleError(vm.errors, 'could not create dinosaur'));
    };
    vm.removeDino = function(dino) {
      $http.delete(baseUrl + '/api/dinosaurs/' + dino._id)
        .then(() => {
          vm.dinosaurs.splice(vm.dinosaurs.indexOf(dino), 1);
        }, csHandleError(vm.errors, 'could not delete dinosaur'));
    };
    vm.updateDino = function(dino) {
      $http.put(baseUrl + '/api/dinosaurs/' + dino._id, dino)
        .then(() => {
          dino.editing = false;
        }, csHandleError(vm.errors, 'could not update dinosaur'));
    };
    vm.startEdit = function(dino) {
      dino.editing = true;
      vm.dinoBackup = copy(dino);
    };
    vm.cancelEdit = function(dino) {
      dino.editing = false;
      for (var key in vm.dinoBackup) {
        if (vm.dinoBackup.hasOwnProperty(key)) {
          dino[key] = vm.dinoBackup[key];
        }
      }
    };
  }]);
};
