import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import {app} from './../app';
import {Token} from './../types/Token';

const api = supertest(app);

describe('user router login', () => {
    test('handles incorrect user names', async () => {
        await api
            .post('/api/user/login/')
            .send(JSON.stringify({name: 'nonexistent', password: 'password1234'}))
            .expect(400);
    });

    test('handles incorrect passwords', async () => {
        await api
            .post('/api/user/login/')
            .send(JSON.stringify({name: 'dev', password: 'password1235'}))
            .expect(400);
    });

    test('sets token cookie correctly', async () => {
        const res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({name: 'dev', password: 'password1234'}))
            .expect(204);
        const setCookie: unknown = res.headers['set-cookie'];
        expect(typeof setCookie).toBe('object');
        const tokenCookie = (setCookie as string[]).find(e => e.startsWith('user-token='));
        expect(typeof tokenCookie).toBe('string');
        const splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        const domain = splitted.find(e => e.startsWith('Domain='));
        expect(typeof domain).toBe('string');
        const token = splitted[0].slice('user-token='.length);
        const payload = jwt.decode(token) as Token;
        expect(payload.userName).toBe('dev');
    });
});