import supertest from 'supertest';
import { server } from '../index';

const api = supertest(server);

describe('backend dummy communication, POST /api/textgen', () => {
    //commented out until someone figures out how to start the dummy backend during backend tests
    /*
    test('router responds correctly with proper request', async () => {
        const data = {
            contexts: ['context'],
            prompt: 'interesting prompt',
            id: 'testid12341241232141243',
        };
        const res = await api.post('/api/textgen').send(data).expect(200);
        expect(res).toHaveProperty('result', 'id')
    });
    */

    test('router responds with 400 with wrong json request', async () => {
        const data = {
            wrong_data: 'haha stinky',
        };
        await api.post('/api/textgen').send(data).expect(400);
    });
});
