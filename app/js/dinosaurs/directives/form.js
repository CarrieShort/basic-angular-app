module.exports = function(app) {
  app.directive('dinoForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/dinosaurs/directives/form.html',
      scope: {
        dino: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateDino,
          create: controller.createDino
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
