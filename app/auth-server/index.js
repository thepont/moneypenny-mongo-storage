const AUTHORIZATION_ENDPOINT =  '/oauth2/authorization';
const TOKEN_ENDPOINT = '/oauth2/token';
module.exports = (options) => {
	var oAuth2Server = require('auth-server/auth/oauth-server/oAuth2Server')(options);
	
	
	return {
		initialize: (app) => {
			app.use(AUTHORIZATION_ENDPOINT, oAuth2Server.controller.authorization)
			app.use(TOKEN_ENDPOINT, oAuth2Server.controller.token)
		},
		/**
		 * Middlewere for checking that people using the service are authenticated.
		 */
		ensureAuthenticated: () => {},
		/**
		 * Method for saving user into database when authenticated, added to passport seralize automatically only required if you change the passport 
		 */
		saveUser: () => {}
		
	}
}