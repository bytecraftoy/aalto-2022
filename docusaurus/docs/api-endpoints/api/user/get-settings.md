# GET /api/user/settings

Get user settings from the database.

## Response

<<<<<<< HEAD
200 on success, 401 if no valid "user-token" cookie is found, and 404 if the user has no save settings. The response body contains the JSON string saved in the database.
=======
200 on success, 401 if no valid "user-token" cookie is found, and 404 if the user has no saved settings. The response body contains the JSON string saved in the database. Back-end does not care how the JSON is structured but some redundant whitespaces may be removed.

> > > > > > > 7eea5f0b07d10eaf67335c61424c3d180eb60392
