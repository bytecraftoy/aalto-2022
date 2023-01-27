# POST /api/user/logout/

Log the user out.

## Response

204 on success and 401 if no valid "user-token" cookie is found. Overrides the "user-token" cookie.
