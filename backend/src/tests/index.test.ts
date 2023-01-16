import supertest from 'supertest';
import { server } from '../index';
const api = supertest(server);

test('The CORS headers are available', async () => {
    const response = await api.get('/');
    expect(response.headers).toHaveProperty(
        'access-control-allow-origin',
        'http://localhost:3000'
    );
});
