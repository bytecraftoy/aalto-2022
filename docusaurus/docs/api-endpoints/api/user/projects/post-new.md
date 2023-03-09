# POST /api/user/projects/new

Save a project for the first time.

## Request

```
{
    name: string, //a name for the project
    data: object //the project data
}
```

Back-end requires the data to be an object but does not care what is inside it.

## Response

200 on success and 401 if no valid "user-token" cookie is found. Response body contain the id of the newly created project in plain text.
