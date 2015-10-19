var ObjectID = require('mongodb').ObjectID;

function SessionUsersQuery(){
    return {
        query : {},
        projection : {},
        idEquals: function(id){
            this.query = {
                ...this.query,
                _id : new ObjectID(id) 
            }
            return this;
        }
    }
}
module.exports = SessionUsersQuery;
