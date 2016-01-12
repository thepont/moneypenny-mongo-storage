var Collection = require('../db/collection');
var ClientQuery = require('./ClientQuery');

module.exports  = function(collection){
	var clientCollection = new Collection(collection);
	return {
		createClient: (client) => {
			return clientCollection.save(client);
		},
		fetchById: (clientId) => {
			var query = ClientQuery().idEquals(clientId);
			return clientCollection.findOne(query);
		}
	}
}
