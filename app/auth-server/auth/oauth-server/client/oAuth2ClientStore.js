var oAuth2ClientQuery = require('./oAuth2ClientQuery');
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthClientCollection = new Collection(db.oauth_client_store);

module.exports = {
	getId: function(client){
		return client.id;
	},
	getRedirectUri: function(client){
		return client.redirectUri;
	},
	fetchById : function(clientId, cb){
		var query = oAuth2ClientQuery(clientId);
		oauthClientCollection.findOne(query).then((client) => {
			cb(null, client);
		});
	},
	checkSecret : function(client, secret, cb){
		//check hash against secret, see if it looks correct.
		return cb(null, client.secret == secret);
	}
}