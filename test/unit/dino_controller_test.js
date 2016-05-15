var angular = require('angular');
require('angular-mocks');

describe('something', ()=>{
  var $controller;

  beforeEach(angular.mock.module('fightApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var dinoctrl = $controller('DinosaursController');
    expect(typeof dinoctrl).toBe('object');
    expect(typeof dinoctrl.getAll).toBe('function');
  });
});
