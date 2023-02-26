# PUT /api/user/password/

Change user password.

## Request

```json
{
    currentPassword: string,
    newPassword: string
}
```

User must be logged in to use this API endpoint. Back-end verifies that the 'currentPassword' is correct before updating the new password to the database.

## Response

204 on success, 401 if no valid "user-token" cookie is found, and 400 if the current password or anything else is wrong. If the current password is incorrect or the new password does not fulfill the requirements there is a plain text error message explaining this in the response body.
