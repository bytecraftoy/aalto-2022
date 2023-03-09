import supertest from 'supertest';
import { getApp } from '../app';
import { initializeUsers } from '../services/testService';

/**
 * Tests the error messages
 */

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getApp();
    api = supertest(server);
});

beforeEach(async () => {
    await initializeUsers();
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
            .send(JSON.stringify({ name: 'tester', password: 'salainen' }))
            .expect(200);
    });

    test('Shows error if logging with wrong credentials', async () => {
        const res = await api
            .post('/api/user/login')
            .send(
                JSON.stringify({
                    name: 'tester',
                    password: 'wrong_passowrd',
                })
            )
            .expect(400);

        expect(res.text).toBe(
            'Incorrect username or password. Please try again.'
        );
    });
});
