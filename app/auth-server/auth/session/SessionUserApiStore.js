var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var SessionUserQuery = require('auth-server/auth/session/SessionUserQuery');
var sessionUsersCollection = new Collection(db.session_users);

module.exports = {
    /**
     * Saves a user in the database.
     * @param {SessionUser} sessionUser - user to save into the database
     * @return {Promise<ObjectId>} - id of the user object in the database
     */ 
    save: function(sessionUser){
        return sessionUsersCollection.save(sessionUser);
    },
    /**
     * Loads a session users from the database
     * @param {ObjectId} id - id of the user to load.
     * @returns {Promise<SessionUser>} - SessionUser loaded from id.
     */ 
    load: function(id){
        var query = SessionUserQuery().idEquals(id);
        console.log(query);
        return sessionUsersCollection.findOne(query);
    }
}
