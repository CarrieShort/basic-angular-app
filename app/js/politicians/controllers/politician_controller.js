const handleError = require('../../lib').handleError;
const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;
module.exports = function(app) {
  app.controller('PoliticianController', ['$http', function($http) {
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
    vm.removePolitician = function(politician) {
      $http.delete(baseUrl + '/api/politicians/' + politician._id)
        .then(() => {
          vm.politicians.splice(vm.politicians.indexOf(politician), 1);
        }, handleError.bind(vm));
    };
    vm.updatePolitician = function(politician) {
      $http.put(baseUrl + '/api/politicians/' + politician._id, politician)
        .then(() => {
          politician.editing = false;
        }, handleError.bind(vm));
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
