# POST /api/export/xlsx/:name

To export data as a XLSX file the client should first send the data to `POST /export/xlsx/:name` and right after that open a new tab to `GET /export/xlsx/:id/` with the ID received from the first request. The name for the downloaded file will be specified in the POST request's path.

## Request

```
{
    theme: string,
    panels: Panel[]
}
```

Where Panel is defined as follows:

```
{
    category: string,
    panels: Panel[],
    boxes: Box[]
}
```

And Box is defined as follows:

```
{
    id: string,
    input: string,
    output: string
}
```

The objects can contain additional properties.

## Response

Returns a random ID string of 30 characters including small and big letters and numbers. The ID can be used to fetch the exported data as a downloadable XLSX file with `GET /export/xlsx/:id`. The data may be removed from the server’s memory to make space for new exports.

In the current implementation JSON and XLSX exports share the same ID pool. The format in which the data is returned is thus determined by the path to which the first POST request was sent. However, the front-end should not expect this to be the case in the future.
