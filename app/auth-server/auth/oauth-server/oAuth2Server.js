var oauth2lib = require('oauth20-provider');
var oauth2 = new oauth2lib({log: {level: 2}});
var oAuth2RefreshTokenMongoStore = require('auth-server/auth/oauth-server/refresh-token/oAuth2RefreshTokenMongoStore');
var oAuth2TokenMongoStore = require('auth-server/auth/oauth-server/token/oAuth2TokenMongoStore');

// Refresh token
oauth2.model.refreshToken.getUserId = oAuth2RefreshTokenMongoStore.getUserId;
oauth2.model.refreshToken.getClientId = oAuth2RefreshTokenMongoStore.getClientId;
oauth2.model.refreshToken.getScope = oAuth2RefreshTokenMongoStore.getScope;
oauth2.model.refreshToken.fetchByToken = oAuth2RefreshTokenMongoStore.fetchByToken;
oauth2.model.refreshToken.removeByUserIdClientId = oAuth2RefreshTokenMongoStore.removeByUserIdClientId;
oauth2.model.refreshToken.removeByRefreshToken = oAuth2RefreshTokenMongoStore.removeByRefreshToken;
oauth2.model.refreshToken.create = oAuth2RefreshTokenMongoStore.create;

// Access token
oauth2.model.accessToken.getToken = oAuth2TokenMongoStore.getToken;
oauth2.model.accessToken.fetchByToken = oAuth2TokenMongoStore.fetchByToken;
oauth2.model.accessToken.checkTTL = oAuth2TokenMongoStore.checkTTL;
oauth2.model.accessToken.getTTL = oAuth2TokenMongoStore.getTTL;
oauth2.model.accessToken.fetchByUserIdClientId = oAuth2TokenMongoStore.fetchByUserIdClientId;
oauth2.model.accessToken.create = oAuth2TokenMongoStore.create;


module.exports = oauth2;
