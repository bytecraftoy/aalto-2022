# GET /api/health/

## Response

```
{
    status: string,
    version: string
}
```

The version consists of git commit time and short git version hash.

Example:

```
{ "status": "OK", "version": "2022-12-02T09:59:46+02:00-660632d" }
```
