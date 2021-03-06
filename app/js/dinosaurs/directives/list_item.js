module.exports = function(app) {
  app.directive('dinoItem', () => {
    return {
      restrict: 'EAC',
      templateUrl: '/templates/dinosaurs/directives/list_item.html',
      require: '^ngController',
      transclude: true,
      scope: {
        dino: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeDino;
        scope.edit = controller.startEdit;
      }
    };
  });
};
