var winston = require('winston');
require("babel/register")({
    //highlightCode: false,
    ignore: /node_modules\/(?!auth-server).*/
 });

// Disable logging while testing.
var logger = require('auth-server/util/logger');
logger.remove(winston.transports.Console);
