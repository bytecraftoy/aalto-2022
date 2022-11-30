import supertest from 'supertest';
import { app } from '../app';
const api = supertest(app);

test('mirror router responds correctly', async () => {
    let res = await api.get('/api/mirror/some/path').expect(200);
    expect(res.text).toBe('/some/path');

    res = await api.post('/api/mirror/').send('some data').expect(200);
    expect(res.text).toBe('some data');
});
