module.exports = function(app) {
  require('./cs_handle_error.js')(app);
  require('./cs_resource.js')(app);
};
