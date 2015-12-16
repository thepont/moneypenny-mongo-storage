const ERR_DB_NOT_SET = 'options.db is not set';

const COLLECTION_OAUTH_USERS = 'oauth_users';
const COLLECTION_REFRESH_TOKEN = 'oauth_refresh_token';
const COLLECTION_TOKEN = 'oauth_token';
const COLLECTION_CLIENT = 'oauth_client';
const COLLECTION_CODE = 'oauth_code';

module.exports = function(options){
    if(!options.db){
        throw new Error(ERR_DB_NOT_SET);
    }
    
    var oauth_users = options.db.collection(options.userCollection || COLLECTION_OAUTH_USERS);
	var oauth_refresh_token = options.db.collection(options.refreshTokenCollection || COLLECTION_REFRESH_TOKEN);
	var oauth_token = options.db.collection(options.tokenCollection ||COLLECTION_TOKEN);
	var oauth_client = options.db.collection(options.clientCollection || COLLECTION_CLIENT);
    var oauth_code = options.db.collection(options.codeCollection || COLLECTION_CODE);
    
    return {
        clientStore: require('./stores/ClientStore')(oauth_client),
        codeStore: require('./stores/CodeStore')(oauth_code),
        refreshTokenStore: require('./stores/RefreshTokenStore')(oauth_refresh_token),
        tokenStore: require('./stores/TokenStore')(oauth_token),
        userStore: require('./stores/UserStore')(oauth_users)
    }   		
}