# POST /api/user/login/

Log the user in.

## Request

```
{
    name: string,
    password: string
}
```

## Response

200 on success and body contains { userName: string, id: string}, and 400 if the user is not found or if the password does not match.
Sets a session cookie "user-token" in which a JWT is saved. The JWT includes information for identifying the user (name and id) and an expiration time.

### Cookie Attributes

Secure (only in production mode to prevent leaking the token with unsecure HTTP connection)

HttpOnly (to prevent stealing the token with a XSS attack)

SameSite=Strict (to prevent accidentally sending the cookie to some other server)
