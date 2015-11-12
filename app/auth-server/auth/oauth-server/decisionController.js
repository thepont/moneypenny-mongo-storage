var authorization = require('oauth20-provider/lib/authorization');
/**
 * Don't show authorization page just allow client to authorize
 */ 
module.exports = function(req, res, client, scope, user){
    req.body.decision = 1;
    req.method = POST;
    return authorization(req, res);
};
