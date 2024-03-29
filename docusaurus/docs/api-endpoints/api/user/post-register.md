# POST /api/user/register/

Register a new user. Creates a new user to the database and logs the user in.

## Request

The register key is a secret token given to the user to allow registration.

```json
{
    name: string,
    password: string,
    key: string //registration key
}
```

The registration key is a secret random string. By knowing the key, the user proves that they have the right to register.

Users that are allowed to register are provided with a link like this:

```
https://domain.com/register/?key=registration-key
```

By following the link they get to the registration page. Front-end reads the registration key from the key query parameter.

## Response

200 on success and body contains { userName: string, id: string}, 400 if the name is already taken and 401 if the register key is invalid
On success the "user-token" cookie is set with the session token just like when logging in.
