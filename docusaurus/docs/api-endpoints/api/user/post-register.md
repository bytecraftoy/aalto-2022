# POST /api/user/register/

Register a new user. Creates a new user to the database and logs the user in.

## Request

```
{
    name: string,
    password: string
}
```

## Response

204 on success and 400 if the name is already taken.
On success the "user-token" cookie is set with the session token just like when logging in.