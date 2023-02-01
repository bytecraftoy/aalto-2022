/**
 * Big parts of the code in this file is commented out
 * until we decide how to do tests with the database.
 */

import supertest from 'supertest';
import { TokenPayload } from '../types/TokenPayload';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { app } from './../app';
import { createToken, createUser } from '../services/userService';
import { selectUserSettings, updateUserSettings } from '../db/queries';

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

    /*test('sets token cookie correctly', async () => {
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
    });*/
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

    /*test('handles logged-in and logged-out users correctly', async () => {
        //log in
        let res = await api
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
    });*/
});

describe('user router info', () => {
    test('handles anonymous users correctly', async () => {
        await api.get('/api/user/').expect(401);
    });

    /*test('handles logged-in users correctly', async () => {
        //log in
        let res = await api
            .post('/api/user/login/')
            .send(JSON.stringify({ name: 'dev', password: 'password1234' }))
            .expect(204);
        const setCookie: string[] = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        //try after logging in
        res = await api.get('/api/user/').set('Cookie', setCookie).expect(200);
        expect(res.body.name).toBe('dev');
    });

    test('handles logged-out users correctly', async () => {
        //log in
        let res = await api
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
        //try after logging out
        await api.get('/api/user/').set('Cookie', setCookie).expect(401);
    });*/

    test('handles invalid tokens correctly', async () => {
        const setCookie = [
            'user-token=EsmR82PKQCHeiDEuBpzEoyORcAv9kF; Path=/; HttpOnly; Secure; SameSite=Strict',
        ];
        await api.get('/api/user/').set('Cookie', setCookie).expect(401);
    });
});

describe('user router register', () => {
    test('returns 400 for empty body', async () => {
        await api.post('/api/user/register/').expect(400);
    });

    test('returns 204 for valid input', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({ name: 'testuser', password: 'password1234' })
            )
            .expect(204);
    });

    test('returns 400 for short password', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify({ name: 'testuser', password: '123' }))
            .expect(400);
    });

    test('returns 400 for empty username', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify({ name: '', password: 'password1234' }))
            .expect(400);
    });

    test('returns 400 for password longer than 50 characters', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    name: 'testuser',
                    password: 'a'.repeat(51),
                })
            )
            .expect(400);
    });

    test('returns 400 for username longer than 50 characters', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    name: 'a'.repeat(51),
                    password: 'password1234',
                })
            )
            .expect(400);
    });

    test('returns 400 for user that already exists', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({ name: 'testuser', password: 'password1234' })
            )
            .expect(204);
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({ name: 'testuser', password: 'password1234' })
            )
            .expect(400);
    });

    test('returns 400 for missing username', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify({ password: 'password1234' }))
            .expect(400);
    });

    test('returns 400 for missing password', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify({ username: 'testuser' }))
            .expect(400);
    });

    test('ignores extra fields', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    name: 'testuser',
                    password: 'password1234',
                    extra: 'lol',
                })
            )
            .expect(204);
    });

    test('sends jwt token in response', async () => {
        const res = await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({ name: 'testuser', password: 'password1234' })
            )
            .expect(204);
        const setCookie = res.headers['set-cookie'] as string[];
        expect(typeof setCookie).toBe('object');
        const tokenCookie = setCookie.find((e) => e.startsWith('user-token='));
        expect(typeof tokenCookie).toBe('string');
        const splitted = (tokenCookie as string).split('; ');
        expect(splitted.includes('HttpOnly')).toBe(true);
        expect(splitted.includes('Secure')).toBe(true);
        expect(splitted.includes('SameSite=Strict')).toBe(true);
        const token = splitted[0].slice('user-token='.length);
        const payload = jwt.decode(token) as TokenPayload;
        expect(payload.userName).toBe('testuser');
    });

    test('bad info with 400 response does not have jwt token', async () => {
        const res = await api
            .post('/api/user/register/')
            .send(JSON.stringify({ name: 'testuser', password: '' }))
            .expect(400);
        expect(res.headers['set-cookie']).toBe(undefined);
    });

    test('existing user with 400 response does not have jwt token', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({ name: 'testuser', password: 'password1234' })
            )
            .expect(204);
        const res = await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({ name: 'testuser', password: 'password1234' })
            )
            .expect(400);
        expect(res.headers['set-cookie']).toBe(undefined);
    });

    // basic concurrent data-race test
    test('return 204 for 1 request and 400 for rest for multiple concurrent requests', async () => {
        const promises = [];
        const num_requests = 10;
        for (let i = 0; i < num_requests; i++) {
            promises.push(
                api.post('/api/user/register/').send(
                    JSON.stringify({
                        name: 'testuser',
                        password: 'password1234',
                    })
                )
            );
        }
        const res = await Promise.all(promises);
        const res204 = res.filter((e) => e.status === 204).length;
        const res400 = res.filter((e) => e.status === 400).length;
        expect(res204).toBe(1);
        expect(res400).toBe(num_requests - 1);
    });

    test('can create 100 users succesfully', async () => {
        const promises = [];
        const num_requests = 100;
        for (let i = 0; i < num_requests; i++) {
            promises.push(
                api.post('/api/user/register/').send(
                    JSON.stringify({
                        name: crypto.randomUUID(),
                        password: crypto.randomUUID(),
                    })
                )
            );
        }
        const res = await Promise.all(promises);
        const res204 = res.filter((e) => e.status === 204).length;
        expect(res204).toBe(num_requests);
    });
});

describe('user router get settings', () => {
    let token: string;
    let user_id: string;

    beforeEach(async () => {
        user_id = (await createUser('testuser', 'password1234')).message;
        const payload: TokenPayload = {
            userName: 'testuser',
            userID: user_id,
        };
        token = await createToken(payload);
    });

    test('can fetch user data succesfully', async () => {
        await updateUserSettings(user_id, { testdata: 2 });
        const settings = await api
            .get('/api/user/settings/')
            .set('Cookie', `user-token=${token}`);
        expect(settings.status).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = JSON.parse(settings.text);
        expect(data).toStrictEqual({ testdata: 2 });
    });

    test('returns 401 without jwt token', async () => {
        await api.get('/api/user/settings/').expect(401);
    });

    test('returns 401 with bad jwt token', async () => {
        await api
            .get('/api/user/settings/')
            .set('Cookie', 'user-token=badtoken')
            .expect(401);
    });

    test('return 404 on missing settings', async () => {
        await api
            .get('/api/user/settings/')
            .set('Cookie', `user-token=${token}`)
            .expect(404);
    });
});

describe('user router update settings', () => {
    let token: string;
    let user_id: string;

    beforeEach(async () => {
        user_id = (await createUser('testuser', 'password1234')).message;
        const payload: TokenPayload = {
            userName: 'testuser',
            userID: user_id,
        };
        token = await createToken(payload);
    });

    test('updating settings works when uninitialized', async () => {
        const data = { testdata: 2 };
        await api
            .put('/api/user/settings/')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(204);
        const settings = await selectUserSettings(user_id);
        expect(settings).toStrictEqual(data);
    });

    test('updating settings works when already set', async () => {
        await updateUserSettings(user_id, { testdata: 2 });
        await api
            .put('/api/user/settings/')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify({ testdata: 3 }))
            .expect(204);
        const settings = await api
            .get('/api/user/settings/')
            .set('Cookie', `user-token=${token}`);
        expect(settings.status).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = JSON.parse(settings.text);
        expect(data).toStrictEqual({ testdata: 3 });
    });

    test('returns 400 with malformed body', async () => {
        await api
            .put('/api/user/settings/')
            .set('Cookie', `user-token=${token}`)
            .send('asd{')
            .expect(400);
    });

    test('malformed update does not modify previous state', async () => {
        await updateUserSettings(user_id, { testdata: 2 });
        await api
            .put('/api/user/settings/')
            .set('Cookie', `user-token=${token}`)
            .send('asd{')
            .expect(400);
        const settings = await api
            .get('/api/user/settings/')
            .set('Cookie', `user-token=${token}`);
        expect(settings.status).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = JSON.parse(settings.text);
        expect(data).toStrictEqual({ testdata: 2 });
    });

    test('returns 401 with missing jwt token', async () => {
        await api.put('/api/user/settings/').expect(401);
        await api
            .put('/api/user/settings/')
            .send(JSON.stringify({ testdata: 2 }))
            .expect(401);
    });

    test('returns 401 with malformed jwt token', async () => {
        await api
            .put('/api/user/settings/')
            .set('Cookie', 'user-token=badtoken')
            .expect(401);
    });
});
