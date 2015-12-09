var db = require('moneypenny-server/services/db');
var Collection = require('moneypenny-server/services/collection');
var LocalUserQuery = require('./LocalUserQuery');
var PasswordCrypto = require('moneypenny-server/util/PasswordCrypto');
var localUsersCollection = new Collection(db.local_users);

module.exports = {
    /**
     *Gets a user form the database with a username of username
     *@param {string} username username to search for.
     *@returns <Promise{User}> User that has the corresponding username
     */ 
    
    getUser: function(username){
        var query = LocalUserQuery().usernameEqualsIgnoreCase(username);
        return localUsersCollection.findOne(query);                   
    },

    /**
     * Verify a user against a password.
     * @param {string} username username to authenticate.
     * @param {string} password password to authenticate with.
     */ 
    
    // verifyUser: function(username, password){
    //     var query = LocalUserQuery().usernameEqualsIgnoreCase(username).showHash();
    //     return localUsersCollection.findOne(query).then(function(user){
    //         return PasswordCrypto.checkPassword(password, user.hash).then(() => {
    //             return LocalUserQuery.findByUsername(username);
    //         });
    //     });
    // },

    /**		
     * Returns the password hash for a user.
     * @param {string} username username of the user to find the hash of
     * @returns {Promise<string>} String containging the hash of the users password.
     */
    
    getUserHash: function(username){
        var query = LocalUserQuery().usernameEqualsIgnoreCase(username).showHash();
        return localUsersCollection.findOne(query);
    },
    
    /** 
     * Adds a new local user into the system.
     * @param {User} user user attempting to add a user.
     * @param {string} username to add to the system.
     * @param {string} password password to assign to the new user.
     */ 
    // addUser: function(user, username, password){
        
    // },
    
    /**
     * Changes a users password.
     * @param {User} user attempting to change password.
     * @param {string} username username of the user that requires the password change. 
     * @param {string} newPassword password to change the password to.
     */
    // changePassword: function(username, password){

    // },
    
    /**
     *List all local users in the system.
     *@returns {Promise<User[]>} promse with list of all the local users in the system.
     */ 
    // listUsers: function(){
        
    // }
}
