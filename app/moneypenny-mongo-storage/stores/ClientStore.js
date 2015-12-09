var Collection = require('moneypenny-mongo-storage/db/collection');
var ClientQuery = require('./ClientQuery');

module.exports  = function(collection){
	var clientCollection = new Collection(collection);
	return {
		createClient: (client) => {
			return clientCollection.save(client);
		},
		fetchById: (clientId, cb) => {
			var query = ClientQuery().idEquals(clientId);
			console.log(clientId, query);
			return clientCollection.findOne(query);
		}
	}
}
