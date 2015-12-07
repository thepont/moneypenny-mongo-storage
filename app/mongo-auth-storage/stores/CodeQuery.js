function oAuth2CodeQuery(){
    return {
        query: {},
        projection : {},
        codeEquals : function(code){
            this.query =  {
                ...this.query,
                code : code
            }
            return this;
        }
    }
}
module.exports = oAuth2CodeQuery;
