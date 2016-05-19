module.exports = function(app) {
  app.directive('dinoItem', function(){
    return {
      restrict: 'EAC',
      templateUrl: '/templates/dinosaurs/directives/list_item.html',
      require: '^ngController',
      scope: {
        dino: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeDino;
      }
    };
  });
};
