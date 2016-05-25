const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;
module.exports = function(app) {
  app.controller('PoliticianController', ['$http', 'csHandleError', function($http, csHandleError) {
    var vm = this;
    vm.politicians = [];
    vm.errors = [];
    vm.getAll = () => {
      $http.get(baseUrl + '/api/politicians')
        .then((res) => {
          vm.politicians = res.data;
        }, csHandleError(vm.errors, 'could not retrieve politicians'));
    };
    vm.createPolitician = () => {
      $http.post(baseUrl + '/api/politicians', vm.newPolitician)
        .then((res) => {
          vm.politicians.push(res.data);
          vm.newPolitician = null;
        }, csHandleError(vm.errors, 'could not create politician'));
    };
    vm.removePolitician = function(politician) {
      $http.delete(baseUrl + '/api/politicians/' + politician._id)
        .then(() => {
          vm.politicians.splice(vm.politicians.indexOf(politician), 1);
        }, csHandleError(vm.errors, 'could not delete politician'));
    };
    vm.updatePolitician = function(politician) {
      $http.put(baseUrl + '/api/politicians/' + politician._id, politician)
        .then(() => {
          politician.editing = false;
        }, csHandleError(vm.errors, 'could not update politician'));
    };
    vm.startEdit = function(politician) {
      politician.editing = true;
      vm.politicianBackup = copy(politician);
    };
    vm.cancelEdit = function(politician) {
      politician.editing = false;
      for (var key in vm.politicianBackup) {
        if (vm.politicianBackup.hasOwnProperty(key)) {
          politician[key] = vm.politicianBackup[key];
        }
      }
    };
  }]);
};
