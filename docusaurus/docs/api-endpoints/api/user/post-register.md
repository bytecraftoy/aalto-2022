# POST /api/user/register/

Register a new user. Creates a new user to the database and logs the user in.

## Request

The register key is a secret token given to the user to allow registration.

```
{
    name: string,
    password: string
    key: string
}
```

## Response

204 on success and 400 if the name is already taken, and 401 if the register key is invalid.
On success the "user-token" cookie is set with the session token just like when logging in.
