import { createUser } from './userService';
import supertest from 'supertest';

export const testUserName = 'tester';
export const testUserPassword = 'salainen';

/**
 * Initializes the users for the tests
 */
export const initializeUsers = async () => {
    await createUser(testUserName, testUserPassword);
};

/**
 * Returns a token cookie for the default test user.
 *
 * Usage:
 *
 * const cookie = await getUserToken(api);
 *
 * api.get('/api/router/').set('Cookie', cookie);
 */
export const getUserToken = async (
    api: supertest.SuperTest<supertest.Test>
) => {
    const res = await api
        .post('/api/user/login/')
        .send(
            JSON.stringify({
                name: testUserName,
                password: testUserPassword,
            })
        )
        .expect(204);
    const setCookie: unknown = res.headers['set-cookie'];
    expect(typeof setCookie).toBe('object');
    const cookie = (setCookie as string[]).filter((e) =>
        e.startsWith('user-token=')
    )[0];
    expect(typeof cookie).toBe('string');
    return cookie;
};
