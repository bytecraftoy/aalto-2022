# DELETE /api/user/projects/:id

Delete the project by id.

## Response

204 on success, 401 if no valid "user-token" cookie is found, and 404 if the database contains no project with given id.
