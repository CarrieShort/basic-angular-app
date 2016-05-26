const baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;
module.exports = function(app) {
  app.controller('DinosaurController', ['csResource', function(Resource) {
    this.dinosaurs = [];
    this.errors = [];
    var remote = new Resource(this.dinosaurs, this.errors, baseUrl + '/api/dinosaurs');

    this.getAll = remote.getAll.bind(remote);
    this.createDino = function() {
      remote.save(this.newDino)
        .then(() => {
          this.newDino = null;
        });
    }.bind(this);
    this.removeDino = remote.remove.bind(remote);
    this.updateDino = function(dino) {
      // remote = new Resource(this.dinosaurs, this.errors, baseUrl + '/api/dinosaurs');
      remote.update(dino)
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
