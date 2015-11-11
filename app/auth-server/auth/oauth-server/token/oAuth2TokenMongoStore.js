
var oAuth2TokenQuery = require('./oAuth2TokenQuery') 
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthRefreshCollection = new Collection(db.oauth_token);
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var sessionUserApiStore = require('auth-server/auth/session/SessionUserApiStore');
const SECRET = 'a_password';

function createAccessToken(user, userId, clientId, scope, ttl){
	return new Promise((resolve, reject)=>{
		var token = jwt.sign(user, SECRET, {expiresIn : ttl});
		var accessToken = {
			token: token,
			userId: userId,
			clientId: clientId,
			scope: scope,
			expiresAt : new Date((new Date()).getTime() + ttl)
		};
		return resolve(accessToken);
	});
}

module.exports = {
	getToken : function(accessToken){
		return accessToken.token;
	},
	create: function(userId, clientId, scope, ttl, cb){
        sessionUserApiStore.load(userId).then(user => {
			return createAccessToken(user, userId,clientId, scope, ttl).then((accessToken)=>{
				return oauthRefreshCollection.save(accessToken).then(()=>{
					return cb(null, accessToken.token);
				});
			});
        }).catch(err => {
            return cb(err);
        });
	},
	fetchByToken : function(token, callback){
		var query = oAuth2TokenQuery().tokenEquals(token);
		oauthRefreshCollection.findOne(query).then((accessToken) => {
			return cb(null, accessToken);
		}).catch((err)=>{
			return cb(err);
		});
	},
	checkTTL : function(accessToken){
		try{
            jwt.verify(accessToken.token,SECRET);
            return true;
        } catch (err){
            return false;
        }
	},
	getTTL : function(token, cb){
		return  token.expiresAt - (new Date()).getTime();
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
