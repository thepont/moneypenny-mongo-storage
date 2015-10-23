
var oAuth2TokenQuery = require('./oAuth2TokenQuery') 
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthRefreshCollection = new Collection(db.oauth_token);
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var sessionUserApiStore = require('auth-server/auth/session/SessionUserApiStore');
const SECRET = 'a_password';

module.exports = {
	getToken : function(accessToken){
		return accessToken.token;
	},
	create: function(userId, clientId, scope, ttl, cb){
        sessionUserApiStore.load(userId).then(user => {
            var token = jwt.sign(user, SECRET, {expiresIn : ttl});
            var accessToken = {
                token: token,
                userId: userId,
                clientId: clientId,
                scope: scope,
                expiresAt : new Date((new Date()).getUTCMilliseconds() + ttl)
            };
            oauthRefreshCollection.save(accessToken).then(()=>{
               return cb(null, token);
            }).catch(err=>{
               return cb(err);
            });
        }).catch(err => {
            return cb(err);
        });
	},
	fetchByToken : function(token, callback){
		var query = oAuth2TokenQuery().findByToken(token);
		oauthRefreshCollection.findOne(query).then((accessToken) => {
			return cb(null, accessToken);
		}).catch((err)=>{
			return cb(err);
		});
	},
	checkTTL : function(accessToken){
		return accessToken.expiresAt.getUTCMilliseconds() > (new Date()).getUTCMilliseconds();
	},
	getTTL : function(token, cb){
		var query = oAuth2TokenQuery().findByToken(token);
		oauthRefreshCollection.findOne(query).then((accessToken) => {
			var ttl = accessToken.expiresAt.getUTCMilliseconds() - (new Date()).getUTCMilliseconds();
			return cb(ttl)
		}).catch((err)=>{
			return cb(err);
		});
	},
	fetchByUserIdClientId : function(userId, clientId, cb){
		var query = oAuth2TokenQuery().clientIdEquals(clientId).userIdEquals(userId);
		oauthRefreshCollection.findOne(query).then((accessToken) => {
			return cb(null, accessToken)
		}).catch((err) =>{
			return cb(err);
		});
	},
	
	
}
