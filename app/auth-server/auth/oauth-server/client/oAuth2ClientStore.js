var oAuth2ClientQuery = require('./oAuth2ClientQuery');
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthClientCollection = new Collection(db.oauth_client_store);
var PasswordCrypto = require('auth-server/util/PasswordCrypto');

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
		//TODO: fix so we down allow everyone
        return cb(null, true);

        //check hash against secret, see if it looks correct.
        PasswordCrypto.checkPassword(secret, client.secret).then(()=>{
           return cb(null, true);
        }).catch((err)=>{
            console.log(err);
           return cb(null, false);
        })
	}
}
