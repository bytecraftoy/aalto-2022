# GET /api/user/projects/:id

Get the project data by id.

## Response

```
{
    name: string, //a name for the project
    data: object //the project data
}
```

Back-end does not care what the data is as long it is an object or an array and not null.

200 on success, 401 if no valid "user-token" cookie is found, and 404 if no project with given id is found or the project belongs to another user.
