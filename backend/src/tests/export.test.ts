import supertest from 'supertest';
import { app } from '../app';
const api = supertest(app);

describe('export router', () => {
    const data = '{"a":[1, 2],"b":true}';
    const fileName = 'file.json';

    test('handles incorrect IDs', async () => {
        await api.get('/export/json/abc/').expect(404);
    });

    test('saves and servers and deletes data correctly', async () => {
        let res = await api
            .post('/export/json/' + fileName)
            .send(data)
            .expect(200);

        const id = res.text;

        expect(typeof id).toBe('string');
        expect(id.length >= 16).toBe(true);

        res = await api.get(`/export/json/${id}/`).expect(200);
        expect(res.headers['content-disposition']).toBe(
            `attachment; filename="${fileName}"`
        );
        expect(res.text).toBe(data);

        await api.get(`/export/json/${id}/`).expect(404);
    });
});
