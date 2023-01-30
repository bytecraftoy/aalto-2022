import { executeQuery } from '../db/queries';
import { createUser } from './userService';

/**
 * Initializes the users for the tests
 */
export const initializeUsers = async () => {
    await executeQuery('DELETE FROM users', []);
    await createUser('tester', 'salainen');
};
