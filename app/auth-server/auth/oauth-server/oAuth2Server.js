var oauth2lib = require('oauth20-provider');
var oauth2 = new oauth2lib({log: {level: 2}});

module.exports = oauth2;
