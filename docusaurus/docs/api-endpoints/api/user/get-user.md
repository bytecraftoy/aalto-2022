# GET /api/user/

## Response

200 if user is logged in and 401 if no valid "user-token" cookie is found.

```
{
    name: string,
    id: string
}
```

If the user is logged in the response includes the user's name and id. More properties may be added to the response in the future.
