
var oAuth2TokenQuery = require('./oAuth2TokenQuery') 
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthRefreshCollection = new Collection(db.oauth_token);
var crypto = require('crypto');

module.exports = {
	getToken : function(accessToken){
		return accessToken.token;
	},
	create: function(userId, clientId, scope, ttl, cb){
		var token = crypto.randomBytes(64).toString('hex');
    	var accessToken = {
			token: token, 
			userId: userId, 
			clientId: clientId, 
			scope: scope,
			expiresAt : new Date((new Date()).getUTCMilliseconds() + ttl)
		};
        oauthRefreshCollection.save(accessToken).then(()=>{
            cb(null, accessToken);
        }).catch(err=>{
            cb(err);  
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
