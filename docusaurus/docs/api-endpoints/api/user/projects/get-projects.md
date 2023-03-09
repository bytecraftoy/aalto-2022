# GET /api/user/projects/

Get a list of user's saved projects.

## Response

```
{
    id: string,
    name: string
}[]
```

200 on success and 401 if no valid "user-token" cookie is found.
If the user is logged in a list of users saved projects is returned.
