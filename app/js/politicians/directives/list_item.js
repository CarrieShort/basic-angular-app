module.exports = function(app) {
  app.directive('politicianItem', () => {
    return {
      restrict: 'EAC',
      templateUrl: '/templates/politicians/directives/list_item.html',
      require: '^ngController',
      transclude: true,
      scope: {
        politician: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removePolitician;
        scope.edit = controller.startEdit;
      }
    };
  });
};
