import supertest from 'supertest';
import { server } from '../index';

const api = supertest(server);

describe('backend dummy communication, POST /api/textgen', () => {
    test('router responds with 400 for wrong json request', async () => {
        const data = {
            wrong_data: 'incorrect',
        };
        await api.post('/api/textgen').send(data).expect(400);
    });
});
