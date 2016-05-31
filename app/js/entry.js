const angular = require('angular');
require(__dirname + '/../css/style.css');
const fightApp = angular.module('fightApp', []);

require('./services')(fightApp);
require('./dinosaurs')(fightApp);
require('./politicians')(fightApp);
require('./joint')(fightApp);
