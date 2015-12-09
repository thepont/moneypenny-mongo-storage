function oAuth2ClientQuery(){
	return {
		query : {},
		projection:{},
		idEquals : function(id) {
			this.query._id = id;
			return this;
		}
    }
}
module.exports = oAuth2ClientQuery;
