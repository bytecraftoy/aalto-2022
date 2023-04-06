/**
 * tests the /apy/health router
 */
import supertest from 'supertest';
import fs from 'fs';
import { getApp } from '../app';

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getApp();
    api = supertest(server);
});

describe('health router', () => {
    const version = (() => {
        try {
            return fs.readFileSync('./files/timestamp-commit').toString();
        } catch (e) {
            return 'N/A';
        }
    })();
    test('gives correct response', async () => {
        const res = await api.get('/api/health').expect(200);
        expect(res.body.status).toBe('OK');
        expect(res.body.version).toBe(version);
    });
});
