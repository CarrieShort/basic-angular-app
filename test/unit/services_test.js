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

describe('csResouce Service', () => {
  beforeEach(angular.mock.module('fightApp'));

  it('should return a function', angular.mock.inject((csResource) => {
    expect(typeof csResource).toBe('function');
  }));

  // it('should get a list of dinos', angular.mock.inject((csResource) => {
  //   this.testArr = [{name: 'whatever'}];
  //   this.testErrors = [];
  //   var baseUrl = 'http://localhost/3000';
  //   this.remote = new csResource(this.testArr, this.testErrors, baseUrl + '/api/dinosaurs');
  //   var testService = this.remote.getAll.bind(this.remote);
  //   testService();
  //   console.log(this.testArr, this.testErrors, baseUrl, this.remote);
  //   expect(this.testArr[0].message).toBe('test message');
  // }));
  // it('should create a dinosaur', angular.mock.inject((csResource) => {
  //   this.testArr = [];
  //   this.testErrors = [];
  //   var baseUrl = 'http://localhost:3000';
  //   this.testRemote = new csResource(this.testArr, this.testErrors, baseUrl + '/api/dinosaurs');
  //   console.log(this.testRemote);
  //   var testService = this.testRemote.save.bind(this.testRemote);
  //   testService({name:'bluebear'});
  //   console.log(this.testRemote);
  //   expect(this.testRemote.data[0]).toBe('test message');
  // }));
});
