# POST /api/export/json/:name

To export data as a JSON file the client should first send the data in JSON format to `POST /export/json/:name` and right after that open a new tab to `GET /export/json/:id/` with the ID received from the first request. The name for the downloaded file will be specified in the POST request's path.

## Request

The request body should include the exported data in JSON format. Malformatted may or may not be accepted.

## Response

Returns a random ID string of 30 characters including small and big letters and numbers. The ID can be used to fetch the exported data as a downloadable JSON file with `GET /export/json/:id`. The data may be removed from the server’s memory to make space for new exports.
