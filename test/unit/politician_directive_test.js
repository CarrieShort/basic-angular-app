var angular = require('angular');
require('angular-mocks');
const formTemplate = require('../../app/templates/politicians/directives/form.html');
const listItemTemplate = require('../../app/templates/politicians/directives/list_item.html');

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
  it('should load render a politician form', () => {
    $httpBackend
    .when('GET', '/templates/politicians/directives/form.html').respond(200, formTemplate);

    var form = $compile('<section data-ng-controller="PoliticianController as politicianCtrl" '
    + 'class="politicians"><politician-form data-politician="{}" data-action="test"'
    + ' data-button-text="test button"></politician-form></section>');
    var directive = form($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('input').length).toEqual(4);
    expect(directive.find('button').text()).toBe('test button');
    expect(directive.find('button').hasClass('btn-test-politician')).toBe(true);
  });
  it('should create a politician list item', () => {
    $httpBackend
    .when('GET', '/templates/politicians/directives/list_item.html').respond(200, listItemTemplate);
    $scope.politician = {
      name: 'Raegan',
      party: 'celebrity',
      specialPower: 'charisma',
      debateSkills: 3
    };
    var item = $compile('<section data-ng-controller="PoliticianController as politicianCtrl" '
    + 'class="politicians"><li data-politician-item data-politician="politician"></li></section>');
    var directive = item($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('p').text())
    .toBe('Raegan is a celebrity that has the power of charisma and a debate skill of 3');
  });
  it('should transclude data to li', () => {
    $httpBackend
    .when('GET', '/templates/politicians/directives/list_item.html').respond(200, listItemTemplate);
    var item = $compile('<section data-ng-controller="PoliticianController as dinoCtrl" '
    + 'class="politicians"><li data-politician-item data-politician="politician">'
    + '<span>transcluded</span></li></section>');
    var directive = item($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('span').text())
    .toBe('transcluded');
  });
});
