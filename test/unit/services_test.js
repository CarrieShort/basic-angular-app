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