var Collection = require('moneypenny-mongo-storage/db/collection');
var TokenQuery = require('./TokenQuery');

module.exports = function(collection){
	var tokenCollection = new Collection(collection);
	return {
		save : (tokenObj) => {
			return tokenCollection.save(tokenObj);
		},
		fetchByToken : (token) => {
			var query = TokenQuery().tokenEquals(token);
			return tokenCollection.findOne(query);
		},
		fetchByUserIdClientId : (userId, clientId) => {
			var query = TokenQuery().clientIdEquals(clientId).userIdEquals(userId);
			return tokenCollection.findOne(query);
		}
	}
} 