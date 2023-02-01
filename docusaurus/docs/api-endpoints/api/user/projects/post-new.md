# POST /api/user/projects/new

Save a project for the first time.

## Request

```
{
    name: string, //a name for the project
    json: string //the project data in JSON format
}
```

Back-end does not care how the JSON is structured but some redundant whitespaces may be removed.

## Response

200 on success and 401 if no valid "user-token" cookie is found. Response body contain the id of the newly created project in plain text.
