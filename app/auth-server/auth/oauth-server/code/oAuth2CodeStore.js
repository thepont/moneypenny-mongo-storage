var jwt = require('jsonwebtoken');
var oAuth2CodeQuery = require('./oAuth2CodeQuery');
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oAuth2CodeCollection = new Collection(db.oauth_code_store);

const SECRET = 'secret';

module.exports = {
    getUserId: function(code){
        return code.userId;
    },
    getClientId: function(code){
        return code.getClientId;
    },
    getScope: function(code){
        return code.scope;
    },
    checkTTL: function(code){
        //TODO: GET METHOD TO WORK
        console.log(code);
        return true;
        try{
            jwt.verify(code.code);
            return true;
        } catch (err){
            return false;
        }
    },
    create: function(userId, clientId, scope, ttl, cb){
        var params = {
            userId: userId,
            clientId: clientId,
            scope: scope,
            ttl: ttl
        }
        var code = jwt.sign(params, SECRET, {maxAge: ttl});
        params.code = code;
        
        console.log(oAuth2CodeCollection);

        oAuth2CodeCollection.save(params).then(() => {
            return cb(null, code);
        }).catch((err)=>{
            console.log(err);
            return cb(err);
        });
    },
    fetchByCode : function(code, cb){
       var query = oAuth2CodeQuery().codeEquals(code);
       oAuth2CodeCollection.findOne(query)
            .then(params => {
                return cb(null, params);
            })
            .catch(err => {
                console.log("ERROR :", err);
                return cb(err);
            });
    },
    removeByCode : function(code, cb){
        var query = oAuth2CodeQuery().codeEquals(code);
        oAuth2CodeCollection.remove(query).then(()=>{
            cb(null);
        }).catch(err=>{
            cb(err);
        })
    }
}

