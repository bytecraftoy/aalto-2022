# GET /api/export/json/:id/

To export data as a JSON file the client should first send the data in JSON format to `POST /export/json/:name` and right after that open a new tab to `GET /export/json/:id/` with the ID received from the first request. The name for the downloaded file will be specified in the POST request's path.

## Response

Returns the data associated to the ID in response body. Content-Disposition HTTP header will be set to `"attachment; filename=\"name\""` where `name` is the file name defined in the POST request's path.
