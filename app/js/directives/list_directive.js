module.exports = function(app) {
  app.directive('dinoList', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'templates/list.html',
      scope: {
        dinosaurs: '='
      }
    };
  });
};
