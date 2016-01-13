var Collection = require('moneypenny-mongo-storage/db/collection');
var CodeQuery = require('./CodeQuery');


module.exports = function(collection){
    var codeCollection = new Collection(collection);
    return {
        save : function(oauth2Code){
            return codeCollection.save(oauth2Code);
        },
        fetchByCode : function(code){
            var query = CodeQuery().codeEquals(code);
            return codeCollection.findOne(query);
        }, 
        removeByCode : function(code){
            var query = CodeQuery().codeEquals(code);
            return codeCollection.remove(query);
        }
    }
}
