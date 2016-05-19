module.exports = function(app) {
  app.directive('dinoItem', function(){
    return {
      restrict: 'EAC',
      templateUrl: '/templates/dinosaurs/directives/list_item.html',
      require: '^dinoList',
      scope: {
        dino: '='
      }
    };
  });
};
