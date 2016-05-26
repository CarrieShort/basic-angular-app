module.exports = function(app) {
  app.factory('csResource', ['$http', 'csHandleError', ($http, csHandleError) => {
    var Resource = function(resourceArr, errorsArr, baseUrl) {
      if (!this instanceof Resource) return new Resource.Apply(this, arguments);
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errorsArr;
    };
    Resource.prototype.getAll = function() {
      console.log('get all fired');
      console.log('from service', this.data, this.url, this.errors);
      return $http.get(this.url)
        .then((res) => {
          console.log('then res fired', this.data);
          this.data.splice(0);
          for (var i = 0; i < res.data.length; i++) {
            this.data.push(res.data[i]);
          }
        }, csHandleError(this.errors, 'could not fetch resource'));
    };
    Resource.prototype.save = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, csHandleError(this.errors, 'could not create resource'));
    };
    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(csHandleError(this.errors, 'could not update resource'));
    };
    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, csHandleError(this.errors, 'could not delete resource'));
    };
    return Resource;
  }]);
};
