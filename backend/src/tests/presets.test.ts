/**
 * Tests presets router /api/presets
 */
import supertest from 'supertest';
import { getApp } from '../app';
import { getUserToken, initializeUsers } from '../services/testService';

beforeEach(async () => {
    await initializeUsers();
});

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getApp();
    api = supertest(server);
});

describe('presets api', () => {
    test('returns valid json', async () => {
        const token = await getUserToken(api);
        const res = await api
            .get('/api/presets')
            .set('Cookie', token)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=UTF-8');
        JSON.parse(res.text);
    });

    test('returns 401 without token', async () => {
        await api.get('/api/presets').expect(401);
    });
});
