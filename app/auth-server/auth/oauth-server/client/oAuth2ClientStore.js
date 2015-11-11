var oAuth2ClientQuery = require('./oAuth2ClientQuery');
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthClientCollection = new Collection(db.oauth_client_store);
var PasswordCrypto = require('auth-server/util/PasswordCrypto');
var logger = require('auth-server/util/logger');

const ERROR_CLIENT_CHECK_SECRET = 'Checking client secret failed';

module.exports = {
	getId: function(client){
		return client.id;
	},
	getRedirectUri: function(client){
		return client.redirectUri;
	},
	fetchById : function(clientId, cb){
		var query = oAuth2ClientQuery().idEquals(clientId);
		oauthClientCollection.findOne(query).then((client) => {
			return cb(null, client);
		}).catch((err)=>{
			return cb(err, null);
		});
	},
	checkSecret : function(client, secret, cb){
        //check hash against secret, see if it looks correct.
        PasswordCrypto.checkPassword(secret, client.secret).then(()=>{
           return cb(null, true);
        }).catch((err)=>{
           logger.error(ERROR_CLIENT_CHECK_SECRET, client, err)
           return cb(null, false);
        })
	}
}
