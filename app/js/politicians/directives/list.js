module.exports = function(app) {
  app.directive('politicianList', () => {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      require: '^ngController',
      templateUrl: '/templates/politicians/directives/list.html',
      scope: {
        politicians: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.cancel = controller.cancelEdit;
      }
    };
  });
};
