var angular = require('angular');
require('angular-mocks');
const testTemplate = require('../../app/templates/dinosaurs/directives/form.html');

describe('test directive', () => {
  var $compile;
  var $rootScope;
  var $scope;
  var $httpBackend;

  beforeEach(angular.mock.module('fightApp'));

  beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$httpBackend_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));
  it('should load render a dinosaur form', () => {
    $httpBackend
    .when('GET', '/templates/dinosaurs/directives/form.html').respond(200, testTemplate);

    var element = $compile('<section data-ng-controller="DinosaurController as dinoCtrl"'
    + '  class="dinosaurs"><dino-form data-dino="{}" data-action="test" data-button-text="test'
    + ' button"></dino-form></section>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.find('button').text()).toBe('test button');
    expect(element.find('button').hasClass('btn-test-dino')).toBe(true);
  });
});
