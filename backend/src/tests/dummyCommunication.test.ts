import supertest from 'supertest';
import { server } from '../index';
import { initializeUsers, getUserToken } from './../services/testService';

beforeEach(async () => {
    await initializeUsers();
});

const api = supertest(server);

describe('backend dummy communication, POST /api/textgen', () => {
    const data = {
        wrong_data: 'incorrect',
    };

    test('is not available for anonymous users', async () => {
        await api.post('/api/textgen').send(data).expect(401);
    });

    test('router responds with 400 for wrong json request', async () => {
        const cookie = await getUserToken(api);
        await api
            .post('/api/textgen')
            .set('Cookie', cookie)
            .send(data)
            .expect(400);
    });
});
