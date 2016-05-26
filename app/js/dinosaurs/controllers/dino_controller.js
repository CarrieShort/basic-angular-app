const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;
module.exports = function(app) {
  app.controller('DinosaurController', ['csResource', function(Resource) {
    this.dinosaurs = [];
    this.errors = [];
    this.remote = new Resource(this.dinosaurs, this.errors, baseUrl + '/api/dinosaurs');

    this.getAll = this.remote.getAll.bind(this.remote);
    this.createDino = function() {
      this.remote.save(this.newDino)
        .then(() => {
          this.newDino = null;
        });
    }.bind(this);
    this.removeDino = this.remote.remove.bind(this.remote);
    this.updateDino = function(dino) {
      this.remote.update(dino)
        .then(() => {
          dino.editing = false;
        });
    };
    this.startEdit = function(dino) {
      dino.editing = true;
      this.dinoBackup = copy(dino);
    }.bind(this);
    this.cancelEdit = function(dino) {
      dino.editing = false;
      for (var key in this.dinoBackup) {
        if (this.dinoBackup.hasOwnProperty(key)) {
          dino[key] = this.dinoBackup[key];
        }
      }
    }.bind(this);
  }]);
};
