module.exports = function(app) {
  require('./item_directive.js')(app);
  require('./list_directive.js')(app);
};
