module.exports = function(app) {
  app.factory('csHandleError', () => {
    return function(errorsArr, message) {
      return function(err) {
        console.log(err);
        errorsArr.push(new Error(message));
      };
    };
  });
};
