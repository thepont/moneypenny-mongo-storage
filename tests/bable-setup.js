var winston = require('winston');
require("babel/register")({
    highlightCode: false,
    ignore: /node_modules\/(?!auth-server)|node-oauth20-provider/
 });

// Disable logging while testing.
var logger = require('auth-server/util/logger');
logger.remove(winston.transports.Console);
