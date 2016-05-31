module.exports = function(app) {
  app.factory('csDeathTouch', () => {
    return {
      count: 0,
      addCount: function() {
        this.count++;
      }
    };
  });
};
