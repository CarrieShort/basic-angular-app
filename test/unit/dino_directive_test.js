var angular = require('angular');
require('angular-mocks');
// const testTemplate = require('../../app/templates/dinosaurs/directives/form.html');

describe('test directive', () => {
  beforeEach(angular.mock.module('fightApp'));
  var $scope, $httpBackend, $compile;
  beforeEach(angular.mock.inject((_$httpBackend_, $rootScope, _$compile_) => {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
  }));
  // it('should transclude some html', function() {
  //   $httpBackend.expectGET('templates/dinosaurs/directives/form.html').respond(200, testTemplate);
  //   var testDirective = $compile('<p>stick some stuff</p>')($scope);
  //   $httpBackend.flush();
  //   expect(testDirective.html().indexOf('stick some stuff')).not.toBe(-1);
  // });
  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<dino-form></dino-form>")($scope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $scope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });
});
