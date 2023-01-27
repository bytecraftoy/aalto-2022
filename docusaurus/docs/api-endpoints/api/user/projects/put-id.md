# PUT /api/user/projects/:id

Save the project by id.

## Request

```
{
    name: string, //a name for the project
    json: string //the project data in JSON format
}
```

Back-end does not care how the JSON is structured but some redundant whitespaces may be removed.

## Response

204 on success, 401 if no valid "user-token" cookie is found, and 404 if the database contains no project with given id.
