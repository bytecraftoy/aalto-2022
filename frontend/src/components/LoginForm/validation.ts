import { z } from 'zod';

/**
 * Username schema validation
 */
export const usernameSchema = z
<<<<<<< HEAD
    .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
    })
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(49, { message: 'Username must be at most 49 characters long' });
=======
    .string()
    .min(1, { message: 'Username is required' })
    .max(49, { message: 'Username is too long' });

export const passwordSchema = z
    .string()
    .min(1, { message: 'Password is required' });
>>>>>>> ee4579cafcfdc3c9dbc20edc8aa6ad016f444f1d
