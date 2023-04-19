import supertest from 'supertest';
import { getApp } from '../app';
import dotenv from 'dotenv';
dotenv.config();

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getApp();
    api = supertest(server);
});

describe('Service status', () => {
    test('Test that in the dev mode dummy service', async () => {
        expect(process.env.ENVIRONMENT).toBeUndefined();

        const res = await api
            .get('/api/status')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');
        expect(res.body).toEqual({ environment: 'Dummy service' });
    });

    test('In the production environment gives davinci', async () => {
        expect(process.env.ENVIRONMENT).toBeUndefined();
        process.env.ENVIRONMENT = 'openai';
        expect(process.env.ENVIRONMENT).toBe('openai');
        const res = await api
            .get('/api/status')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');
        expect(res.body).toEqual({ environment: 'OpenAI text-davinci-003' });
    });
});
