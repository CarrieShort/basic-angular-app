module.exports = function(app) {
  app.directive('politicianForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/politicians/directives/form.html',
      scope: {
        politician: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updatePolitician,
          create: controller.createPolitician
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
