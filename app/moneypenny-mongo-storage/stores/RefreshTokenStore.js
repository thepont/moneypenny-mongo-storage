var Collection = require('moneypenny-mongo-storage/db/collection');
var RefreshTokenQuery = require('./RefreshTokenQuery');

module.exports = function(collection){
    var refreshTokenCollection = new Collection(collection);
    return {
        save: function(refreshToken){
            return refreshTokenCollection.save(refreshToken);
        },
        fetchByToken: function(token){
            var query = RefreshTokenQuery().tokenEquals(token);
            return refreshTokenCollection.findOne(query);
        },
        removeByUserIdClientId: function(userId, clientId){
            var query = RefreshTokenQuery().clientIdEquals(clientId).userIdEquals(userId);
            return refreshTokenCollection.remove(query);
        },
        removeByRefreshToken: function(token){
            var query = RefreshTokenQuery().tokenEquals(token);
            return refreshTokenCollection.remove(query);
        }
    }
}