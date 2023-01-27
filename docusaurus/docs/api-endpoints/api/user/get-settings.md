# GET /api/user/settings

Get user settings from the database.

## Response

200 on success, 401 if no valid "user-token" cookie is found, and 404 if the user has no save settings. The response body contains the JSON string saved in the database.
