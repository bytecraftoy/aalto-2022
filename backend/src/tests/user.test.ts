/**
 * Big parts of the code in this file is commented out
 * until we decide how to do tests with the database.
 */

import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from './../app';
import { TokenPayload } from '../types/TokenPayload';
import { initializeUsers } from './../services/testService';

const api = supertest(app);

beforeEach(async () => {
    await initializeUsers();
});

describe('user router login', () => {
    test('handles incorrect user names', async () => {
        await api
            .post('/api/user/login/')
            .send(
                JSON.stringify({
                    name: 'nonexistent',
                    password: 'salainen',
                })
            )
            .expect(400);
    });

    test('handles incorrect passwords', async () => {
        await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'tester', password: 'incorrect' }))
            .expect(400);
    });

    test('sets token cookie correctly', async () => {
        const res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'tester', password: 'salainen' }))
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
        expect(payload.userName).toBe('tester');
    });
});

describe('user router logout', () => {
    test('handles anonymous users correctly', async () => {
        const res = await api.post('/api/user/logout/').expect(204);
        //the user-token cookie should be set
        const setCookie: string[] = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        const tokenCookie = setCookie.find((e) => e.startsWith('user-token='));
        expect(typeof tokenCookie).toBe('string');
        const splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        const token = splitted[0].slice('user-token='.length);
        expect(jwt.decode(token)).toBe(null);
    });

    test('handles logged-in and logged-out users correctly', async () => {
        //log in
        let res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'tester', password: 'salainen' }))
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
        let tokenCookie = setCookie.find((e) => e.startsWith('user-token='));
        expect(typeof tokenCookie).toBe('string');
        let splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        let token = splitted[0].slice('user-token='.length);
        expect(jwt.decode(token)).toBe(null);
        //try log out again
        res = await api
            .post('/api/user/logout/')
            .set('Cookie', setCookie)
            .expect(204);
        setCookie = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        //check that the cookie is overwritten properly
        tokenCookie = setCookie.find((e) => e.startsWith('user-token='));
        expect(typeof tokenCookie).toBe('string');
        splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        token = splitted[0].slice('user-token='.length);
        expect(jwt.decode(token)).toBe(null);
    });
});

describe('user router info', () => {
    test('handles anonymous users correctly', async () => {
        await api.get('/api/user/').expect(401);
    });

    test('handles logged-in users correctly', async () => {
        //log in
        let res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'tester', password: 'salainen' }))
            .expect(204);
        const setCookie: string[] = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        //try after logging in
        res = await api.get('/api/user/').set('Cookie', setCookie).expect(200);
        expect(res.body.name).toBe('tester');
    });

    test('handles logged-out users correctly', async () => {
        //log in
        let res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'tester', password: 'salainen' }))
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
