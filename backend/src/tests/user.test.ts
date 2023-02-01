/**
 * Big parts of the code in this file is commented out
 * until we decide how to do tests with the database.
 */

import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from './../app';
import { TokenPayload } from '../types/TokenPayload';
import {
    initializeUsers,
    testUserName,
    testUserPassword,
    getUserToken,
} from './../services/testService';

const api = supertest(app);

beforeEach(async () => {
    await initializeUsers();
});

/**
 * Checks that all cookie settings are set correctly.
 * Parses and validates the token.
 * Tests inside this function won't fail if the token is invalid.
 * @param setCookie the value in res.headers['set-cookie']
 * @returns {{tokenCookie: string, payload: TokenPayload | null}} payload is null if the token is invalid
 */
const checkTokenCookie = (setCookie: unknown) => {
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
    const payload = jwt.decode(token) as TokenPayload | null;
    return { tokenCookie, payload };
};

describe('user router login', () => {
    test('handles incorrect user names', async () => {
        await api
            .post('/api/user/login/')
            .send(
                JSON.stringify({
                    name: 'nonexistent',
                    password: testUserPassword,
                })
            )
            .expect(400);
    });

    test('handles incorrect passwords', async () => {
        await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: testUserName, password: 'incorrect' }))
            .expect(400);
    });

    test('sets token cookie correctly', async () => {
        const res = await api
            .post('/api/user/login/')
            .send(
                JSON.stringify({
                    name: testUserName,
                    password: testUserPassword,
                })
            )
            .expect(204);
        const { payload } = checkTokenCookie(res.headers['set-cookie']);
        expect(payload?.userName).toBe(testUserName);
    });

    test('works fine with getUserToken', async () => {
        const tokenCookie = await getUserToken(api);
        const splitted = tokenCookie.split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        const token = splitted[0].slice('user-token='.length);
        const payload = jwt.decode(token) as TokenPayload;
        expect(payload.userName).toBe(testUserName);
    });
});

describe('user router logout', () => {
    test('handles anonymous users correctly', async () => {
        const res = await api.post('/api/user/logout/').expect(204);
        //the user-token cookie should be set
        const { payload } = checkTokenCookie(res.headers['set-cookie']);
        expect(payload).toBe(null);
    });

    test('handles logged-in and logged-out users correctly', async () => {
        //log in
        const cookie = await getUserToken(api);
        //log out
        let res = await api
            .post('/api/user/logout/')
            .set('Cookie', cookie)
            .expect(204);
        const { tokenCookie, payload } = checkTokenCookie(
            res.headers['set-cookie']
        );
        expect(payload).toBe(null);
        //try log out again
        res = await api
            .post('/api/user/logout/')
            .set('Cookie', tokenCookie as string)
            .expect(204);
        expect(checkTokenCookie(res.headers['set-cookie']).payload).toBe(null);
    });
});

describe('user router info', () => {
    test('handles anonymous users correctly', async () => {
        await api.get('/api/user/').expect(401);
    });

    test('handles logged-in users correctly', async () => {
        //log in
        const cookie = await getUserToken(api);
        //try after logging in
        const res = await api
            .get('/api/user/')
            .set('Cookie', cookie)
            .expect(200);
        expect(res.body.name).toBe(testUserName);
    });

    test('handles logged-out users correctly', async () => {
        //log in
        const cookie = await getUserToken(api);
        //log out
        const res = await api
            .post('/api/user/logout/')
            .set('Cookie', cookie)
            .expect(204);
        const setCookie = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        //try after logging out
        await api.get('/api/user/').set('Cookie', setCookie).expect(401);
    });

    test('handles invalid tokens correctly', async () => {
        const setCookie = [
            'user-token=EsmR82PKQCHeiDEuBpzEoyORcAv9kF; Path=/; HttpOnly; Secure; SameSite=Strict',
        ];
        await api.get('/api/user/').set('Cookie', setCookie).expect(401);
    });
});
