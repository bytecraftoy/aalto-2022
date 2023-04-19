import { z } from 'zod';

/**
 * Login schema validation
 */
export const loginUsernameSchema = z
    .string()
    .min(1, { message: 'Username is required' })
    .max(49, { message: 'Username is too long' });

export const loginPasswordSchema = z
    .string()
    .min(1, { message: 'Password is required' });

/**
 * Register and password changing schema
 */

export const registerUsernameSchema = z
    .string()
    .trim()
    .min(4, { message: 'Username must be at least 4 characters long' })
    .max(49, { message: 'Username must be at most 49 characters long' });

export const registerPasswordSchema = z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(49, { message: 'Password must be at most 49 characters long' });

export const registerTokenSchema = z
    .string()
    .trim()
    .min(1, { message: 'Token is required' });
