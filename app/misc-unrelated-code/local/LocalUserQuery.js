function LocalUserQuery(){
    return {
        query : {},
        projection : {
            hash : 0
        },
        notDeleted: function(){
            this.query = {
                ...this.query,
                deleted : { $ne: true }
            }
            return this;
        },
        usernameEquals: function(username) {
            this.query = {
                ...this.query,
                username : username
            }
            return this;
        },
        usernameEqualsIgnoreCase(username){
            return this.usernameEquals(new RegExp('^'+username+'$', 'i'));
        },
        showHash: function(){
            this.projection = {
                ...this.projection,
                hash : 1
            }
            return this;
        }
    };
};
module.exports = LocalUserQuery;

