import supertest from 'supertest';
import app from '../index';
const api = supertest(app);

test('mirror router responds correctly', async () => {
    let res = await api.get('/mirror/some/path').expect(200);
    expect(res.text).toBe('/some/path');

    res = await api.post('/mirror/').send('some data').expect(200);
    expect(res.text).toBe('some data');
});
