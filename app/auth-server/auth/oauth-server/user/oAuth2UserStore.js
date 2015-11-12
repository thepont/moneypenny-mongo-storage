//var UserAPIStore = require('auth-server/users/UserAPIStore');

module.exports = {
    fetchFromRequest: function(req){
        return req.user;
    },
    fetchById: function(id, cb){
        console.log('fetch by id called', id);
        //UserAPIStore.getUser(id).then(user=>{
        //    cb(null, user);
        //}).catch(err=>{
        //    cb(err);
        //});
        cb('not implemented')
    },
    getId: function(user){
        return user._id;
    }

};
