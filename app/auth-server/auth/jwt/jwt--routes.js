var jwt = require('jsonwebtoken');

var routes = {
    '/auth/jwt' : {
        get : function(req, res){
            var token = jwt.sign(req.user, 'key');
        }
    }
}
module.exports = routes;
