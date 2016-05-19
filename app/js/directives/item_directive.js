module.exports = function(app) {
  app.directive('dinoItem', function(){
    return {
      restrict: 'EAC',
      templateUrl: 'templates/item.html',
      require: '^dinoList',
      scope: {
        dino: '='
      }
    };
  });
};
