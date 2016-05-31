module.exports = function(app) {
  app.controller('JointController', ['csDeathTouch', function(death) {
    this.counter = death;
  }]);
};
