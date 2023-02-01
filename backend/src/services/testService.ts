import { createUser } from './userService';

/**
 * Initializes the users for the tests
 */
export const initializeUsers = async () => {
    await createUser('tester', 'salainen');
};
