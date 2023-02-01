# GET /api/user/projects/:id

Get the project data by id.

## Response

200 on success, 401 if no valid "user-token" cookie is found, and 404 if no project with given id is found or the project belongs to another user. The response body contains the JSON string saved in the database.
