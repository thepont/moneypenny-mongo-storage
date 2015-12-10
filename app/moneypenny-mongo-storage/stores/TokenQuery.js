function oAuth2TokenQuery(){
	return {
		query : {},
		projection:{},
		tokenEquals : function(token) {
			this.query.token = token;
			return this;
		},
		clientIdEquals : function(clientId){
			this.query.clientId = clientId;
			return this;
		},
		userIdEquals : function(userId){
			this.query.userId = userId;
			return this;
		}
	}
}
module.exports = oAuth2TokenQuery;