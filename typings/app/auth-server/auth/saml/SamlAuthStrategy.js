var SamlStrategy = require('passport-saml').Strategy;
var fs = require('fs');
module.exports = new SamlStrategy(
        {
            callbackUrl: 'http://localhost:3000/auth/saml/login/callback',
            entryPoint: 'https://paul-blueflag-signin-dev-ed.my.salesforce.com/idp/endpoint/HttpRedirect',
            issuer: 'passport-saml',
            cert: fs.readFileSync('/home/pont/projects/authentication-server/config/cert.crt', 'utf-8'),

        },
        function(profile, done){
            console.log('PROFILE :', profile);
            done(null, profile.issuer.$);
        });

//console.log(module.exports.generateServiceProviderMetadata());
