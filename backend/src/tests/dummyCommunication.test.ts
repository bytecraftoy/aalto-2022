import supertest from 'supertest';
import { server } from '../index';
//import { ApiResponse } from '../types/ApiTypes';

const api = supertest(server);

describe('backend dummy communication, POST /api/textgen', () => {
    /**
commented out because it currently fails everytime while the dummy isnt 'connected'
 
    function instanceofApiResponse(object: ApiResponse): object is ApiResponse {
        return (
            'result' in object &&
            'id' in object &&
            Object.keys(object).length == 2
        );
    }

    test('router responds correctly with proper request', async () => {
        const data = {
            contexts: ['context'],
            prompt: 'interesting prompt',
            id: 'testid12341241232141243',
        };
        const res = await api.post('/api/textgen').send(data).expect(200);
        expect(instanceofApiResponse(res)).toBe(true);
    });

*/

    test('router responds with 400 with wrong json request', async () => {
        const data = {
            wrong_data: 'haha stinky',
        };
        await api.post('/api/textgen').send(data).expect(400);
    });
});
