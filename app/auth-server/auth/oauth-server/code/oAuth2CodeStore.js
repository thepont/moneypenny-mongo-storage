var jwt = require('jsonwebtoken');
var oAuth2CodeQuery = require('./oAuth2CodeQuery');
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oAuth2CodeCollection = new Collection(db.oauth_code_store);
var logger = require('auth-server/util/logger');

const SECRET = 'secret';

module.exports = {
    getUserId: function(code){
        return code.userId;
    },
    getClientId: function(code){
        return code.clientId;
    },
    getScope: function(code){
        return code.scope;
    },
    checkTTL: function(code){
        try{
            jwt.verify(code.code,SECRET);
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
        return new Promise((resolve, reject)=>{
            var code = jwt.sign(params, SECRET, {maxAge: ttl, ignoreExpiration: false});
            params.code = code;
            return oAuth2CodeCollection.save(params).then(() => {
                return resolve(code);
            }).catch(err =>{
                return reject(err);
            })
        }).then(code =>{
            return cb(null, code);
        }).catch((err)=>{
            logger.error(err);
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
                logger.error(err);
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

