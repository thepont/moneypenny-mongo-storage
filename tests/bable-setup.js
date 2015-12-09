var winston = require('winston');
require("babel/register")({
    //highlightCode: false,
    ignore: /node_modules\/(?!moneypenny-server).*/
 });

// Disable logging while testing.
var logger = require('moneypenny-server/util/logger');
logger.remove(winston.transports.Console);
