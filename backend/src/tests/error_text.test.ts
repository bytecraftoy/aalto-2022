/* eslint-disable no-console */
import supertest from 'supertest';
import { app } from '../app';
import { userExists } from '../db/queries';
import {
    initializeUsers,
    testUserName,
    testUserPassword,
} from '../services/testService';

const api = supertest(app);

/**
 * Tests the error messages
 */

beforeEach(async () => {
    await initializeUsers();
});

describe('/user/register', () => {
    test('The test user should be in the db', async () => {
        const value = await userExists(testUserName);
        expect(value).toBe(true);
    });

    test('With new username, gives no errors', async () => {
        const res = await api
            .post('/api/user/register')
            .send(
                JSON.stringify({ name: 'new_tester', password: 'sdhf8sdfy8' })
            );

        expect(res.status).toBe(204);

        const value = await userExists('new_tester');
        expect(value).toBe(true);
    });

    test('Backend should tell user if username is already defined', async () => {
        const res = await api
            .post('/api/user/register')
            .send(
                JSON.stringify({ name: testUserName, password: 'new_password' })
            );

        expect(res.status).toBe(400);
        expect(res.text).toBe(
            'Username already exists, please choose a different one.'
        );
    });
});

describe('/user', () => {
    test('Without cookie send the right request', async () => {
        const res = await api.get('/api/user/');

        expect(res.status).toBe(401);
        expect(res.text).toBe('No valid token on the request found');
    });
});

describe('/user/login', () => {
    test('Can log in with right credentials', async () => {
        await api
            .post('/api/user/login')
            .send(
                JSON.stringify({
                    name: testUserName,
                    password: testUserPassword,
                })
            )
            .expect(204);
    });

    test('Shows error if logging with wrong credentials', async () => {
        const res = await api
            .post('/api/user/login')
            .send(
                JSON.stringify({
                    name: testUserName,
                    password: 'wrong_passowrd',
                })
            )
            .expect(400);

        expect(res.text).toBe(
            'Incorrect username or password. Please try again.'
        );
    });
});
