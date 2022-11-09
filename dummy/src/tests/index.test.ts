import supertest from 'supertest';
import { server } from '../index';
const api = supertest(server);

test('can find the api-endpoint', async () => {
    const response = await api.get('/').expect(200);

    expect(response.text).toBe('Hello world!');
});
