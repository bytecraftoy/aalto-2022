/**
 * Service function that helps validate
 * the key used to register for the app
 */
import { logger } from '../utils/logger';

// is only exported for testing, prefer isValidRegisterKey
export const registerKey = process.env.REGISTER_KEY;

if (!registerKey) {
    logger.error('register_key_not_set');
    throw new Error('Register key not set');
}

/// make function async in case we want to check database in future
// eslint-disable-next-line @typescript-eslint/require-await
export const isValidRegisterKey = async (key: string): Promise<boolean> => {
    return key === registerKey;
};
