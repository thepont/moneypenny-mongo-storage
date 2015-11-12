var crypto = require('crypto');
var oAuth2Query = require('./oAuth2RefreshTokenQuery');
var db = require('auth-server/services/db');
var Collection = require('auth-server/services/collection');
var oauthRefreshTokenCollection = new Collection(db.oauth_refresh_token);

module.exports = {
    /**
     *Given the oAuthToken returns the userID.
     *
     *@param <String> oAuthToken - refresh token to look up.
     *@returns <String> userId
     */

    getUserId: function(refreshToken){
        return refreshToken.userId;
    },
    /**
     * Given a oAuthToken returns the client id associated.
     * @param <String> oAuthToken - refresh token to look up.
     * @returns <String> client id - of the client that requested it
     */ 
    getClientId: function(refreshToken){
        return refreshToken.clientId;
    },
    
    getScope: function(refreshToken) {
        return refreshToken.scope;
    },

    create: function(userId, clientId, scope, cb) {
        
        var token = crypto.randomBytes(64).toString('hex');
        
        var refreshToken = {
            token: token,
            userId: userId,
            clientId: clientId,
            scope: scope
        }
        
        oauthRefreshTokenCollection.save(refreshToken).then(() => {
            cb(null, token);
        }).catch((err)=>{
            console.log("ERRROR:", err);
            cb(err);
        })
    },
    fetchByToken: function(token, cb){
        var query = oAuth2Query().tokenEquals(token);
        
        oauthRefreshTokenCollection.findOne(query).then((refreshToken) => {
            cb(null, refreshToken);
        }).catch((err)=>{
            cb(err);
        })
    },
    removeByUserIdClientId: function(userId, clientId, cb) {
        var query = oAuth2Query().clientIdEquals(clientId).userIdEquals(userId);
        oauthRefreshTokenCollection.remove(query).then(()=>{
            cb(null);
        }).catch((err)=>{
            cb(err);  
        });
    },
    removeByRefreshToken: function(token, cb) {
        var query = oAuth2Query().tokenEquals(token);
        oauthRefreshTokenCollection.remove(query).then(()=>{
           cb(null); 
        }).catch((err)=>{
          cb(err);  
        });
    }
}

