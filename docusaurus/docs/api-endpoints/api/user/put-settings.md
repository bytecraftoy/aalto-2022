# PUT /api/user/settings/

Save user settings to the database.

## Request

The request body contains the settings in JSON format. Back-end does not care how the JSON is structured but some redundant whitespaces may be removed.

## Response

204 on success and 401 if no valid "user-token" cookie is found.
