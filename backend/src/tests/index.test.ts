/**
 * tests CORS headers
 */
import supertest from 'supertest';
import { getServer } from '../index';

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getServer();
    api = supertest(server);
});

test('The CORS headers are available', async () => {
    const response = await api.get('/');
    expect(response.headers).toHaveProperty(
        'access-control-allow-origin',
        'http://localhost:3000'
    );
});
