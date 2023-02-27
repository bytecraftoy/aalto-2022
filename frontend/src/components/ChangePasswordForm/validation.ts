import { z } from 'zod';

export const passwordSchema = z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(49, { message: 'Password must be at most 49 characters long' });
