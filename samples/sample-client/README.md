#oauth-local

This application demonstrates how to connect to the authentication server using oAuth.

The following record, as well as a user will have to be added to the money penny database to ba ble to use this sample app


###oauth_client_store

```
{
    "_id" : "oAuthTest",
    "redirectUri" : "http://localhost:3334/auth/provider/callback",
    "secret" : "$2a$10$uXE9L6J5Xq3wW2UCxI11juqVU3xIhNSP2ZoFaiSH//XnfPdQCOU6W"
}
```

###local_users

Add a user with the username: sample_user and password: production1 to the database.

```
{
    "_id" : ObjectId("561edd43fdb77869f16df10f"),
    "username" : "sample_user",
    "hash" : "$2a$10$uXE9L6J5Xq3wW2UCxI11juqVU3xIhNSP2ZoFaiSH//XnfPdQCOU6W",
    "firstName" : "John",
    "lastName" : "Smith"
}
```
