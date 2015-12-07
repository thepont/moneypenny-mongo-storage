var sessionUserStore = require('auth-server/auth/session/SessionUserApiStore');

module.exports = {
    
    /**
    * Gets the user from the express request
    * @return {User} user found in the express request.
    */
    fetchFromRequest: function(req){
        return req.user;
    },
    /**
     * Returns the user found inthe database.
     */
    fetchById: function(id, cb){
        sessionUserStore.load(id)
            .then(user => cb(null, user))
            .catch(err => cb(err));
    },
    /**
     * Gets the user id from the user object.
     * @return {ObjectID} user id in the user object
     */
    getId: function(user){
        return user._id;
    }
};
