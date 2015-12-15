var winston = require('winston');
//require("babel/register")({
    //highlightCode: false,
//    ignore: /node_modules\/(?!moneypenny-server|moneypenny-auth-storage|moneypenny-mongo-storage|moneypenny-client).*/
// });

// Disable logging while testing.
//var logger = require('moneypenny-server/util/logger');
var logger = require('winston');
logger.remove(winston.transports.Console);
