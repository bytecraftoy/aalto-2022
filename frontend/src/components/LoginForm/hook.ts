import React, { useState } from 'react';
import { z } from 'zod';

/**
 * Files for custom hooks of the LoginForm component
 */

/**
 * Username schema validation
 */
const usernameSchema = z
    .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
    })
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(49, { message: 'Username must be at most 49 characters long' });

/**
 * Custom hook for username.
 * Validates the username and gives the possible errors
 */
export const useUsername = () => {
    const [username, setUsername] = useState<string>('');
    let usernameErrors = '';

    const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value);

    const validatedUsername = usernameSchema.safeParse(username);
    if (!validatedUsername.success) {
        const formattedErrors = validatedUsername.error.format();
        usernameErrors = formattedErrors._errors.join(', ');
    }

    return { username, usernameErrors, changeUsername };
};
