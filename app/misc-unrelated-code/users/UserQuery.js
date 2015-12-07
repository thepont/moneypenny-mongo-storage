function UserQuery(){
    return {
        query: {},
        projection: {},
        notDeleted: function(){
            this.query = {
                ...this.query,
                deleted : { $ne: true }
            };
            return this;
        },
        idEquals: function(userId){
            this.query = {
                ...this.query,
                userId : userId
            };
            return this;
        },
        usernameEquals: function(username){
            this.query = {
                ...this.query,
                username : username
            };
            return this;
        },
        usernameEqualsIgnoreCase: function(username){
            return this.usernameEquals(new RegExp('^'+username+'$', 'i'));
        }
    }
}

module.exports = UserQuery;