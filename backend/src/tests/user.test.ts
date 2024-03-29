/**
 * Tests related to users, such as logging in, registering
 *  user settings and projects
 */

import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { getApp } from './../app';
import { createToken, createUser } from '../services/userService';
import {
    selectUserSettings,
    updateUserSettings,
    userExists,
    addProject,
    selectProject,
    selectProjectsbyUserID,
    selectPassword,
} from '../db/queries';
import { registerKey } from '../services/registerKeyService';
import { TokenPayload } from '../types/TokenPayload';
import {
    initializeUsers,
    testUserName,
    testUserPassword,
    getUserToken,
} from './../services/testService';
import crypto from 'crypto';

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getApp();
    api = supertest(server);
});

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
            .send(
                JSON.stringify({
                    name: testUserName,
                    password: 'incorrect',
                })
            )
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
            .expect(200);
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

describe('user router register', () => {
    const validData = {
        name: 'testuser',
        password: 'password1234',
        key: registerKey,
    };

    const validateUserStatus = async (name: string, exists: boolean) => {
        const res = await userExists(name);
        expect(res).toBe(exists);
    };

    test('returns 400 for empty body', async () => {
        await api.post('/api/user/register/').expect(400);
    });

    test('returns 200 for valid input', async () => {
        const before = await userExists(validData.name);
        expect(before).toBe(false);

        await api
            .post('/api/user/register/')
            .send(JSON.stringify(validData))
            .expect(200);
        await validateUserStatus(validData.name, true);
    });

    test('returns 400 for short password', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    password: '123',
                })
            )
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('returns 400 for empty username', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    name: '',
                })
            )
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('returns 400 for password longer than 1000 characters', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    password: 'a'.repeat(1001),
                })
            )
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('returns 400 for username longer than 50 characters', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    name: 'a'.repeat(51),
                })
            )
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('returns 400 for user that already exists', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify(validData))
            .expect(200);
        await api
            .post('/api/user/register/')
            .send(JSON.stringify(validData))
            .expect(400);
    });

    test('returns 400 for missing username', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify({ password: 'password1234' }))
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('returns 400 for missing password', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify({ username: 'testuser' }))
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('ignores extra fields', async () => {
        const res = await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    extra1: 'lol1',
                    ...validData,
                    extra2: 'lol2',
                })
            )
            .expect(200);
        await validateUserStatus(validData.name, true);

        expect(res.body).toBeDefined();
        expect(res.body.userName).toBe('testuser');
    });

    test('sends jwt token in response', async () => {
        const res = await api
            .post('/api/user/register/')
            .send(JSON.stringify(validData))
            .expect(200);
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
        await validateUserStatus(validData.name, true);
    });

    test('bad info with 400 response does not have jwt token', async () => {
        const res = await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    password: '',
                })
            )
            .expect(400);
        expect(res.headers['set-cookie']).toBe(undefined);
        await validateUserStatus(validData.name, false);
    });

    test('existing user with 400 response does not have jwt token', async () => {
        await api
            .post('/api/user/register/')
            .send(JSON.stringify(validData))
            .expect(200);
        const res = await api
            .post('/api/user/register/')
            .send(JSON.stringify(validData))
            .expect(400);
        expect(res.headers['set-cookie']).toBe(undefined);
    });

    // basic concurrent data-race test
    test('return 200 for 1 request and 400 for rest for multiple concurrent requests', async () => {
        const promises = [];
        const num_requests = 10;
        for (let i = 0; i < num_requests; i++) {
            promises.push(
                api.post('/api/user/register/').send(JSON.stringify(validData))
            );
        }
        const res = await Promise.all(promises);
        const res200 = res.filter((e) => e.status === 200).length;
        const res400 = res.filter((e) => e.status === 400).length;
        expect(res200).toBe(1);
        expect(res400).toBe(num_requests - 1);
        await validateUserStatus(validData.name, true);
    });

    test('can create 100 users succesfully', async () => {
        const promises = [];
        const num_requests = 100;
        for (let i = 0; i < num_requests; i++) {
            promises.push(
                api.post('/api/user/register/').send(
                    JSON.stringify({
                        ...validData,
                        name: crypto.randomUUID(),
                        password: crypto.randomUUID(),
                    })
                )
            );
        }
        const res = await Promise.all(promises);
        const res200 = res.filter((e) => e.status === 200).length;
        expect(res200).toBe(num_requests);
    });

    test('returns 400 for missing key', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    name: 'testuser',
                    password: 'password1234',
                })
            )
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('returns 401 for bad key', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    key: 'badkey',
                })
            )
            .expect(401);
        await validateUserStatus(validData.name, false);
    });

    test('returns 400 for empty key', async () => {
        await api
            .post('/api/user/register/')
            .send(
                JSON.stringify({
                    ...validData,
                    key: '',
                })
            )
            .expect(400);
        await validateUserStatus(validData.name, false);
    });

    test('Backend should tell user if username is already defined', async () => {
        await createUser(validData.name, validData.password);

        const res = await api
            .post('/api/user/register')
            .send(JSON.stringify(validData));

        expect(res.status).toBe(400);
        expect(res.text).toBe(
            'Username already exists, please choose a different one.'
        );
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

describe('user router projects', () => {
    let token: string;
    let user_id: string;
    let project_id_1: string;

    beforeEach(async () => {
        user_id = (await createUser('projecttestuser', 'password1234')).message;
        const payload: TokenPayload = {
            userName: 'projecttestuser',
            userID: user_id,
        };
        token = await createToken(payload);
        const projectquery1 = await addProject(user_id, 'name1', {
            testdata: 1,
        });
        project_id_1 = projectquery1.id;
        await addProject(user_id, 'name2', { testdata: 2 });
    });

    test('can fetch projects succesfully (GET api/user/projects)', async () => {
        const res = await api
            .get('/api/user/projects/')
            .set('Cookie', `user-token=${token}`)
            .expect(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toEqual('name1');
        expect(res.body[1].name).toEqual('name2');
    });

    test('can fetch a project succesfully (GET /api/user/projects/:id)', async () => {
        const res = await api
            .get(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=${token}`)
            .expect(200);
        expect(res.body).toEqual({
            name: 'name1',
            data: { testdata: 1 },
        });
    });

    test('can post new project succesfully (POST api/user/projects/new)', async () => {
        const data = {
            name: 'name3',
            data: { testdata: 3 },
        };
        await api
            .post('/api/user/projects/new')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(200);

        const projects = await selectProjectsbyUserID(user_id);
        expect(projects).toHaveLength(3);
    });

    test('can edit project succesfully (PUT api/user/projects/:id)', async () => {
        const data = {
            name: 'name3',
            data: { testdata: 3 },
        };
        await api
            .put(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(204);

        const projects = await selectProjectsbyUserID(user_id);
        expect(projects.map((p) => p.name)).toContain('name3');
        const project = await selectProject(project_id_1);
        expect(project.data).toEqual(data.data);
    });

    test('can delete project succesfully (DELETE api/user/projects/:id)', async () => {
        await api
            .delete(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=${token}`)
            .expect(204);

        const projects = await selectProjectsbyUserID(user_id);
        expect(projects).toHaveLength(1);
    });

    test('requests return 404 when appropriate', async () => {
        const user_id2 = (await createUser('projecttestuser2', 'password1234'))
            .message;
        const payload: TokenPayload = {
            userName: 'projecttestuser2',
            userID: user_id2,
        };

        const token2 = await createToken(payload);

        await api
            .get(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=${token2}`)
            .expect(404);

        const data = {
            name: 'name3',
            data: { testdata: 3 },
        };
        await api
            .put(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=${token2}`)
            .send(JSON.stringify(data))
            .expect(404);

        await api
            .delete(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=${token2}`)
            .expect(404);
    });

    test('returns 401 without jwt token', async () => {
        await api.get('/api/user/projects/').expect(401);
        await api.get(`/api/user/projects/${project_id_1}`).expect(401);
        await api.post('/api/user/projects/new').expect(401);
    });

    test('returns 401 with bad jwt token', async () => {
        await api
            .get('/api/user/projects/')
            .set('Cookie', 'user-token=badtoken')
            .expect(401);
        await api
            .get(`/api/user/projects/${project_id_1}`)
            .set('Cookie', `user-token=badtoken`)
            .expect(401);
        await api
            .post('/api/user/projects/new')
            .set('Cookie', 'user-token=badtoken')
            .expect(401);
    });
});

describe('user router change password', () => {
    let token: string;
    let payload: TokenPayload;
    beforeEach(async () => {
        const user_id = (await createUser('testuser', 'password1234')).message;
        payload = {
            userName: 'testuser',
            userID: user_id,
        };
        token = await createToken(payload);
    });

    test('changing password works when nothing is wrong', async () => {
        const data = {
            currentPassword: 'password1234',
            newPassword: 'password123456',
        };
        const currentHash = await selectPassword(payload.userName);
        await api
            .put('/api/user/password/')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(204);
        const newHash = await selectPassword(payload.userName);
        expect(currentHash !== newHash).toBe(true);
    });

    test('returns 400 with wrong current password', async () => {
        const data = {
            currentPassword: 'incorrect',
            newPassword: 'password123456',
        };
        await api
            .put('/api/user/password/')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(400);
    });

    test('returns 400 with invalid new password', async () => {
        const data = {
            currentPassword: 'password1234',
            newPassword: '00',
        };
        await api
            .put('/api/user/password/')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(400);
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
