var LocalStrategy = require('passport-local').Strategy;
var LocalUserStore = require('auth-server/auth/local/LocalUserAPIStore');
var PasswordCrypto = require('auth-server/util/PasswordCrypto');
var logger = require('auth-server/util/logger');

const MESSAGE_INCORRECT_PASSWORD = 'Username or password incorrect';

var autenticate = function(username, password, done){
    LocalUserStore.getUserHash(username).then((user) => {
        if(!user){
            logger.info('Incorrect Username', username);
            return done(null, false. MESSAGE_INCORRECT_PASSWORD);
        }
        return PasswordCrypto.checkPassword(password, user.hash).then(() => {
            LocalUserStore.getUser(username).then((user) => {
                return done(null,user);
            });
        })
        .catch(function(err){
            logger.info('Incorrect Password', username, err, err);
            return done(null, false, MESSAGE_INCORRECT_PASSWORD);
        })
    }).catch(function(err){
        return done(err);  
    });
};

module.exports = new LocalStrategy(autenticate);
