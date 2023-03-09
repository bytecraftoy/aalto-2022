# PUT /api/user/projects/:id

Save the project by id.

## Request

```
{
    name: string, //a name for the project
    data: object //the project data
}
```

Back-end requires the data to be an object but does not care what is inside it.

## Response

204 on success, 401 if no valid "user-token" cookie is found, and 404 if the database contains no project with given id or the project belongs to another user.
