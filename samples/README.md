The sample client should be able to connect to the sample server, the following will have to be configured for this to work.

Inside the `oauth_client` collection the following record will have to be added

```
{
    "_id" : "oAuthTest",
    "redirectUri" : "http://localhost:3334/auth/provider/callback",
    "secret" : "$2a$10$uXE9L6J5Xq3wW2UCxI11juqVU3xIhNSP2ZoFaiSH//XnfPdQCOU6W"
}
```

after this if the sample server and sample client are launched the two should connect together and you should be able to login with the username "jsmith" and password "password"

##Sample Server

The sample server currently connects to the staging database `mongo.dev.bigdatr.xyz` some constants are set at the top of the sample to change this.