import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from './../app';
import { TokenPayload } from '../types/TokenPayload';

const api = supertest(app);

describe('user router login', () => {
    test('handles incorrect user names', async () => {
        await api
            .post('/api/user/login/')
            .send(
                JSON.stringify({
                    name: 'nonexistent',
                    password: 'password1234',
                })
            )
            .expect(400);
    });

    test('handles incorrect passwords', async () => {
        await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'dev', password: 'password1235' }))
            .expect(400);
    });

    test('sets token cookie correctly', async () => {
        const res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'dev', password: 'password1234' }))
            .expect(204);
        const setCookie: unknown = res.headers['set-cookie'];
        expect(typeof setCookie).toBe('object');
        const tokenCookie = (setCookie as string[]).find((e) =>
            e.startsWith('user-token=')
        );
        expect(typeof tokenCookie).toBe('string');
        const splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        const token = splitted[0].slice('user-token='.length);
        const payload = jwt.decode(token) as TokenPayload;
        expect(payload.userName).toBe('dev');
    });
});

describe('user router logout', () => {
    test('works correctly', async () => {
        //first try before logging in
        let res = await api.post('/api/user/logout/').expect(401);
        expect(res.headers['set-cookie']).toBe(undefined);
        //log in
        res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'dev', password: 'password1234' }))
            .expect(204);
        let setCookie: string[] = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        //log out
        res = await api
            .post('/api/user/logout/')
            .set('Cookie', setCookie)
            .expect(204);
        setCookie = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        //check that the cookie is overwritten properly
        const tokenCookie = setCookie.find((e) => e.startsWith('user-token='));
        expect(typeof tokenCookie).toBe('string');
        const splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        const token = splitted[0].slice('user-token='.length);
        expect(jwt.decode(token)).toBe(null);
        //try log out again
        res = await api
            .post('/api/user/logout/')
            .set('Cookie', setCookie)
            .expect(401);
        expect(res.headers['set-cookie']).toBe(undefined);
    });
});
