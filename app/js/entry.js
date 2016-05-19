const angular = require('angular');
require(__dirname + '/../css/style.css');
const fightApp = angular.module('fightApp', []);

require('./dinosaurs')(fightApp);
