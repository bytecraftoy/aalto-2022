import { z } from 'zod';

/**
 * Username schema validation
 */
export const usernameSchema = z
    .string()
    .min(1, { message: 'Username is required' })
    .max(49, { message: 'Username is too long' });

export const passwordSchema = z
    .string()
    .min(1, { message: 'Password is required' });
