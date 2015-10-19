var db = require('auth-server/services/db').db;
var Collection = require('auth-server/services/collection');
var LocalUserQuery = require('./LocalUserQuery');

var users = new Collection(db.users);

module.exports = {
    /** 
     * Saves a user into the system.
     * @param {User} user to save to the database.
     * @returns {Promise<User>} promise with the user saved.
     */ 
    saveUser: function(user){
       return users.save(user); 
    },
    /**
     * Returns a user that has the id equal to the userID.
     * @param {String} user id to find
     * @returns {Promise<User>} promise returning the user searched for
     */ 
    getUser: function(userId){
        var query = LocalUserQuery().equalsId(userId);
        return users.findOne(query);
    }
}
