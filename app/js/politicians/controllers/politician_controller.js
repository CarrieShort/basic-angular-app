const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('PoliticianController', ['csResource', function(Resource) {
    this.politicians = [];
    this.errors = [];
    this.remote = new Resource(this.politicians, this.errors, baseUrl + '/api/politicians');

    this.getAll = this.remote.getAll.bind(this.remote);
    this.createPolitician = function() {
      this.remote.save(this.newPolitician)
        .then(() => {
          this.newPolitician = null;
        });
    }.bind(this);
    this.removePolitician = this.remote.remove.bind(this.remote);
    this.updatePolitician = function(Politician) {
      this.remote.update(Politician)
        .then(() => {
          Politician.editing = false;
        });
    };
    this.startEdit = function(Politician) {
      Politician.editing = true;
      this.PoliticianBackup = copy(Politician);
    }.bind(this);
    this.cancelEdit = function(Politician) {
      Politician.editing = false;
      for (var key in this.PoliticianBackup) {
        if (this.PoliticianBackup.hasOwnProperty(key)) {
          Politician[key] = this.PoliticianBackup[key];
        }
      }
    }.bind(this);
  }]);
};
