var Collection = require('mongo-auth-storage/db/collection');
var ClientQuery = require('./ClientQuery');

module.exports  = function(collection){
	var clientCollection = new Collection(collection);
	return {
		createClient: (client) => {
			return clientCollection.save(client);
		},
		fetchById: (clientId, cb) => {
			var query = ClientQuery().idEquals(clientId);
			return clientCollection.findOne(query);
		}
	}
}
