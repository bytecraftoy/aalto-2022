import supertest from 'supertest';
import fs from 'fs';
import { app } from '../app';
const api = supertest(app);

describe('health router', () => {
    const version = (() => {
        try {
            return fs.readFileSync('./files/timestamp-commit').toString();
        } catch (e) {
            return 'N/A';
        }
    })();
    console.log('version:', version);
    test('gives correct response', async () => {
        const res = await api.get('/api/health').expect(200);
        expect(res.body.status).toBe('OK');
        expect(res.body.version).toBe(version);
    });
});
