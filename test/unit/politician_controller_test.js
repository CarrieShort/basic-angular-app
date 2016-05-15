var angular = require('angular');
require('angular-mocks');

describe('politician controller', () => {
  var $controller;

  beforeEach(angular.mock.module('fightApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var politicianctrl = $controller('PoliticiansController');
    expect(typeof politicianctrl).toBe('object');
    expect(typeof politicianctrl.getAll).toBe('function');
  });
  describe('REST functionality', () => {
    var $httpBackend;
    var politicianctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      politicianctrl = $controller('PoliticiansController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve politicians', () => {
      $httpBackend.expectGET('http://localhost:3000/api/politicians').respond(200, [{
        name: 'test politician' }]);
      politicianctrl.getAll();
      $httpBackend.flush();
      expect(politicianctrl.politicians.length).toBe(1);
      expect(politicianctrl.politicians[0].name).toBe('test politician');
    });

    it('should create a politician', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/politicians',
      { name: 'test 2' }).respond(200, { name: 'some political person' });
      expect(politicianctrl.politicians.length).toBe(0);
      politicianctrl.newPolitician = { name: 'test 2' };
      politicianctrl.createPolitician();
      $httpBackend.flush();
      expect(politicianctrl.politicians[0].name).toBe('some political person');
      expect(politicianctrl.newPolitician).toBe(null);
    });

    it('should upate a politician', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/politicians/1',
      { name: 'change dinosaurs!', editing: true, _id: 1 }).respond(200);
      politicianctrl.politicians = [{ name: 'test dino', editing: true, _id: 1 }];
      politicianctrl.politicians[0].name = 'change dinosaurs!';
      politicianctrl.updatePolitician(politicianctrl.politicians[0]);
      $httpBackend.flush();
      expect(politicianctrl.politicians[0].editing).toBe(false);
    });

    it('should resign a politician', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/politicians/1').respond(200);
      politicianctrl.politicians = [{ name: 'yogi', _id: 1 }];
      politicianctrl.removePolitician(politicianctrl.politicians[0]);
      $httpBackend.flush();
      expect(politicianctrl.politicians.length).toBe(0);
    });
  });
});
