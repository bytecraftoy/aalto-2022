import { z } from 'zod';

/**
 * Username schema validation
 */
export const usernameSchema = z
    .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
    })
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(49, { message: 'Username must be at most 49 characters long' });
