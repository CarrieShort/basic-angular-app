module.exports = function(app) {
  app.factory('csHandleError', function() {
    return function(errorsArr, message) {
      return function(err) {
        console.log('error log', err);
        errorsArr.push(new Error(message));
        console.log('array log', errorsArr);
      };
    };
  });
};
