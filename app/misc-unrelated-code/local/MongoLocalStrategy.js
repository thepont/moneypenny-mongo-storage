var LocalStrategy = require('passport-local').Strategy;
var LocalUserStore = require('moneypenny-server/auth/local/LocalUserAPIStore');
var PasswordCrypto = require('moneypenny-server/util/PasswordCrypto');
var logger = require('moneypenny-server/util/logger');

const MESSAGE_INCORRECT_PASSWORD = 'Username or password incorrect';

var autenticate = function(username, password, done){
    LocalUserStore.getUserHash(username).then((user) => {
        if(!user){
            logger.info('Incorrect Username', username);
            return done(null, false, MESSAGE_INCORRECT_PASSWORD);
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
