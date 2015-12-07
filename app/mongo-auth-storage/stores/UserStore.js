var Collection = require('mongo-auth-storage/db/collection');
var UserQuery = require('./UserQuery');

module.exports = function(collection){
    var userCollection = new Collection(collection);;
    return{
        /**
        * Saves a user in the database.
        * @param {SessionUser} sessionUser - user to save into the database
        * @return {Promise<ObjectId>} - id of the user object in the database
        */ 
        
        save: function(user){
        return userCollection.save(user); 
        },
        
        /**
        * Loads a session users from the database
        * @param {ObjectId} id - id of the user to load.
        * @returns {Promise<SessionUser>} - SessionUser loaded from id.
        */ 
        fetchById: function(id){
            var query = UserQuery().idEquals(id);
            return userCollection.findOne(query);
        }
    }
}