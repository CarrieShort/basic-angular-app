module.exports = function(app) {
  app.directive('dinoList', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      require: '^ngController',
      templateUrl: '/templates/dinosaurs/directives/list.html',
      scope: {
        dinosaurs: '='
      }
    };
  });
};
