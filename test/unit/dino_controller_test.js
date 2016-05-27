var angular = require('angular');
require('angular-mocks');

describe('dinosaur controller', () => {
  var $controller;

  beforeEach(angular.mock.module('fightApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var dinoctrl = $controller('DinosaurController');
    expect(typeof dinoctrl).toBe('object');
    expect(typeof dinoctrl.getAll).toBe('function');
  });
  describe('REST functionality', () => {
    var $httpBackend;
    var dinoctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      dinoctrl = $controller('DinosaurController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve dinosaurs', () => {
      $httpBackend.expectGET('http://localhost:3000/api/dinosaurs').respond(200, [{
        name: 'test dino' }]);
      dinoctrl.getAll();
      $httpBackend.flush();
      expect(dinoctrl.remote.data.length).toBe(1);
      expect(dinoctrl.remote.data[0].name).toBe('test dino');
    });

    it('should create a dinosaur', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/dinosaurs',
      { name: 'test 2' }).respond(200, { name: 'some dino' });
      expect(dinoctrl.remote.data.length).toBe(0);
      dinoctrl.newDino = { name: 'test 2' };
      dinoctrl.createDino();
      $httpBackend.flush();
      expect(dinoctrl.remote.data[0].name).toBe('some dino');
      expect(dinoctrl.newDino).toBe(null);
    });

    it('should upate a dinosaur', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/dinosaurs/1',
      { name: 'change dinosaurs!', editing: true, _id: 1 }).respond(200);
      dinoctrl.remote.data = [{ name: 'test dino', editing: true, _id: 1 }];
      dinoctrl.remote.data[0].name = 'change dinosaurs!';
      dinoctrl.updateDino(dinoctrl.remote.data[0]);
      $httpBackend.flush();
      expect(dinoctrl.remote.data[0].editing).toBe(false);
    });

    it('should murder a dino', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/dinosaurs/1').respond(200);
      dinoctrl.dinosaurs = [{ name: 'yogi', _id: 1 }];
      dinoctrl.removeDino(dinoctrl.dinosaurs[0]);
      $httpBackend.flush();
      expect(dinoctrl.remote.data.length).toBe(0);
    });
  });
});
