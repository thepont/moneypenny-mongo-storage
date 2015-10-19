var jwt = require('jsonwebtoken');

var routes = {
    '/auth/jwt' : {
        get : function(req, res){
            var token = jwt.sign(req.user, 'key');
            var decoded = jwt.verify(token, 'key');
            res.json(decoded);
        }
    }
}
module.exports = routes;
