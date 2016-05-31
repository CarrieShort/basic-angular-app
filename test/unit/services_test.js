var angular = require('angular');
require('angular-mocks');

describe('csHandleError Service', () => {
  beforeEach(angular.mock.module('fightApp'));
  it('should return a function', angular.mock.inject((csHandleError) => {
    expect(typeof csHandleError).toBe('function');
  }));
  it('should add an error to the errors array', angular.mock.inject((csHandleError) => {
    var testArr = [];
    csHandleError(testArr, 'test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});
describe('csDeathTouch Service', () => {
  beforeEach(angular.mock.module('fightApp'));
  it('should return a function', angular.mock.inject((csDeathTouch) => {
    expect(typeof csDeathTouch.addCount).toBe('function');
  }));
  it('should increment the count when addCount is called', angular.mock.inject((csDeathTouch) => {
    csDeathTouch.addCount();
    expect(csDeathTouch.count).toBe(1);

  }));
});
describe('csResouce Service', () => {
  beforeEach(angular.mock.module('fightApp'));

  it('should return a function', angular.mock.inject((csResource) => {
    expect(typeof csResource).toBe('function');
  }));

  it('should add a dinosaur to array', angular.mock.inject((csResource, $httpBackend) => {
    $httpBackend.expectPOST('http://localhost:8000/api/dinosaurs', {
        name: 'test bear'
      })
      .respond(200, {
        name: 'another test',
        _id: 0
      });
    var baseUrl = 'http://localhost:8000';
    var testArr = [];
    var errorsArr = [];
    var testRemote = new csResource(testArr, errorsArr, baseUrl + '/api/dinosaurs');
    testRemote.save({
      name: 'test bear'
    });
    $httpBackend.flush();
    expect(testArr.length).toBe(1);
    expect(errorsArr.length).toBe(0);
    expect(testArr[0].name).toBe('another test');
  }));

  it('should have update functionality', angular.mock.inject((csResource, $httpBackend, $q) => {
    var baseUrl = 'http://localhost:8000';
    var testDino = {
      name: 'original dino',
      _id: 1
    };
    var testArr = [testDino];
    var errorsArr = [];

    var testRemote = new csResource(testArr, errorsArr, baseUrl + '/api/dinosaurs');

    $httpBackend.expectPUT('http://localhost:8000/api/dinosaurs/1', testDino)
      .respond(200);

    var result = testRemote.update(testDino);
    $httpBackend.flush();
    expect(testArr.length).toBe(1);
    expect(errorsArr.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));

  it('should get all the resources', angular.mock.inject((csResource, $httpBackend) => {
    $httpBackend.expectGET('http://localhost:8000/api/dinosaurs')
      .respond(200, [{
        name: 'Little Foot'
      }]);

    var testArr = [{}, {}, {}, {}];
    var errorsArr = [];
    var baseUrl = 'http://localhost:8000';
    var testRemote = new csResource(testArr, errorsArr, baseUrl + '/api/dinosaurs');

    testRemote.getAll();
    $httpBackend.flush();
    expect(testArr.length).toBe(1);
    expect(testArr[0].name).toBe('Little Foot');
  }));

  it('should remove a resource', angular.mock.inject((csResource, $httpBackend) => {
    $httpBackend.expectDELETE('http://localhost:8000/api/dinosaurs/1').respond(200);
    var testArr = [{
      name: 'testy',
      _id: 1
    }];
    var baseUrl = 'http://localhost:8000';
    var errorsArr = [];
    var testRemote = new csResource(testArr, errorsArr, baseUrl + '/api/dinosaurs');
    testRemote.remove(testArr[0]);
    $httpBackend.flush();
    expect(testArr.length).toBe(0);
  }));
});
