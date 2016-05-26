var angular = require('angular');
require('angular-mocks');
const formTemplate = require('../../app/templates/dinosaurs/directives/form.html');
const listItemTemplate = require('../../app/templates/dinosaurs/directives/list_item.html');

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
    .when('GET', '/templates/dinosaurs/directives/form.html').respond(200, formTemplate);

    var form = $compile('<section data-ng-controller="DinosaurController as dinoCtrl"'
    + '  class="dinosaurs"><dino-form data-dino="{}" data-action="test" data-button-text="test'
    + ' button"></dino-form></section>');
    var directive = form($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('input').length).toEqual(4);
    expect(directive.find('button').text()).toBe('test button');
    expect(directive.find('button').hasClass('btn-test-dino')).toBe(true);
  });
  it('should create a dinosaur list item', () => {
    $httpBackend
    .when('GET', '/templates/dinosaurs/directives/list_item.html').respond(200, listItemTemplate);
    $scope.dino = {
      name: 'Boomasaur',
      diet: 'dynomite',
      specialPower: 'goes boom boom',
      attack: 3
    };
    var item = $compile('<section data-ng-controller="DinosaurController as dinoCtrl"'
    + '  class="dinosaurs"><li data-dino-item data-dino="dino"></li></section>');
    var directive = item($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('p').text())
    .toBe('Boomasaur is a dinosaur that eats dynomite and has'
    + ' the power of goes boom boom  and an attack strength of 3');
  });
  it('should transclude data to li', () => {
    $httpBackend
    .when('GET', '/templates/dinosaurs/directives/list_item.html').respond(200, listItemTemplate);
    var item = $compile('<section data-ng-controller="DinosaurController as dinoCtrl" '
    + 'class="dinosaurs"><li data-dino-item data-dino="dino">'
    + '<span>transcluded</span></li></section>');
    var directive = item($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('span').text())
    .toBe('transcluded');
  });
});
