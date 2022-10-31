import supertest from 'supertest';
import app from '../index';
const api = supertest(app);

test('can find the api-endpoint', async () => {
    const response = await api.get('/').expect(200);

    expect(response.text).toBe('Hello world');
});
