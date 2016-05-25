module.exports = function(app) {
  app.factory('csHandleError', function() {
    return function(errorsArr, message) {
      return function(err) {
        console.log(err);
        errorsArr.push(new Error(message));
      };
    };
  });
};
