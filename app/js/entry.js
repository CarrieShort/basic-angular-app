const angular = require('angular');
require(__dirname + '/../css/style.css');
const dinosaurApp = angular.module('dinosaurApp', []);
const baseUrl = 'http://localhost:3000';

const handleError = function(error) {
  console.log(error);
  this.errors  = (this.errors || []).push(error);
};

dinosaurApp.controller('DinosaursController', ['$http', function($http) {
  this.dinosaurs = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/dinosaurs')
      .then((res) => {
        this.dinosaurs = res.data;
      }, handleError.bind(this));
  };
}]);
