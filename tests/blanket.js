require('./bable-setup.js');
var path = require('path');
var srcDir = path.join(__dirname, '..', 'app', 'auth-server');

require('blanket')({
  pattern: srcDir
});
