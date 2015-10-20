var mongodb = require('mongodb');
var PROPERTIES = require('auth-server/properties');
var logger = require('auth-server/util/logger');

var server = new mongodb.Server(PROPERTIES.MONGODB, 27017, {});

/**
 * Module contains MongoDB connection and collections used by this project.
 * @module db
 */ 


/**
 *Database connection used by this project.
 *@name conn
 *@exports db
 */

var conn = new mongodb.Db(PROPERTIES.MONGODB_DB, server, {
    w: 1,
    readPreference: mongodb.ReadPreference.SECONDARY_PREFERRED
});

/**
 * List containing all the mongodb collections used in this project
 *@name db
 *@exports db
 */
var db = {
    local_users: conn.collection('local_users'),
    session_users: conn.collection('session_users'),
	oauth_refresh_token: conn.collection('oauth_refresh_token'),
	oauth_token: conn.collection('oauth_token'),
	oauth_client_store: conn.collection('oauth_client_store')
};

conn.open(function(err) {
	if (err) {
		// logger.error('Db connection failed', {error: err});
	}
	else {
		// // logger.success('Db connected');
		// db.users.createIndex( { 'username': 1 }, { unique: true }, function(err, index){
		// 	if (err){
		// 		// logger.error('Error Creating Index username' , err);
		// 	} else {
		// 		// logger.debug('Created Index', index);
		// 	}
		// });
	}
});

module.exports = db;
