module.exports = function(app) {
  app.directive('dinoList', () => {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      require: '^ngController',
      templateUrl: '/templates/dinosaurs/directives/list.html',
      scope: {
        dinosaurs: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.cancel = controller.cancelEdit;
      }
    };
  });
};
