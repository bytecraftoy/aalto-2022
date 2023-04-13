/**
 * Tests API validation as well as prompt creation.
 * Does not test the actual router communication, only errors,
 * since opening communications during testing is tricky.
 * However, the dummys own tests should cover for that.
 */

import { getApp } from './../app';
import { createPrompt } from '../services';
import { TokenPayload } from '../types/TokenPayload';
import { createToken, createUser } from '../services/userService';
import supertest from 'supertest';
import { initializeUsers, getUserToken } from './../services/testService';

let api: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
    const server = await getApp();
    api = supertest(server);
});

beforeEach(async () => {
    await initializeUsers();
});

describe('API request validation', () => {
    let token: string;
    let user_id: string;

    beforeEach(async () => {
        user_id = (await createUser('projecttestuser', 'password1234')).message;
        const payload: TokenPayload = {
            userName: 'projecttestuser',
            userID: user_id,
        };
        token = await createToken(payload);
    });

    test('API validation fails when invalid context amount', async () => {
        const params = {
            creativity: 1,
            quality: 1,
            inputLength: 8000,
            outputLength: 5,
        };
        const data = {
            context: ['Medieval', 'character', 'armour'],
            prompt: 'a hero',
            id: '123123',
            parameters: params,
        };
        await api
            .post('/api/textgen')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(400);
    });

    test('API validation fails with invalid parameters', async () => {
        const params = {
            creativity: 1,
            quality: 1,
            inputLength: 1299888108230123,
            outputLength: 5.5,
        };
        const data = {
            context: ['Medieval', 'character'],
            prompt: 'a hero',
            id: '123123',
            parameters: params,
        };
        await api
            .post('/api/textgen')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(400);
    });

    test('API validation fails when too high output length combined with low input length', async () => {
        const params = {
            creativity: 1,
            quality: 1,
            inputLength: 1000,
            outputLength: 5,
        };
        const data = {
            context: ['Medieval', 'character'],
            prompt: 'a hero',
            id: '123123',
            parameters: params,
        };
        await api
            .post('/api/textgen')
            .set('Cookie', `user-token=${token}`)
            .send(JSON.stringify(data))
            .expect(400);
    });
});

describe('backend dummy communication, POST /api/textgen', () => {
    const data = {
        wrong_data: 'incorrect',
    };

    test('is not available for anonymous users', async () => {
        await api.post('/api/textgen').send(data).expect(401);
    });

    test('router responds with 400 for wrong json request', async () => {
        const cookie = await getUserToken(api);
        await api
            .post('/api/textgen')
            .set('Cookie', cookie)
            .send(data)
            .expect(400);
    });
});

describe('promptService: Prompt creation', () => {
    test('Returns a prompt with valid parameters, high quality', () => {
        const prompt = createPrompt(
            ['Medieval', 'character'],
            'a hero',
            0.5,
            9,
            1024,
            5
        );
        expect(prompt.max_tokens).toBeGreaterThan(3000);
        expect(prompt.model).toBe('text-davinci-003');
        expect(prompt.prompt).toBe(
            'Write a game flavor text for a hero which is a character in a Medieval setting'
        );
    });

    test('Returns a prompt with valid parameters, low quality', () => {
        const prompt = createPrompt(
            ['Medieval', 'character'],
            'a hero',
            0.5,
            2,
            1024,
            5
        );
        expect(prompt.max_tokens).toBeLessThan(3000);
        expect(prompt.model).toBe('text-babbage-001');
        expect(prompt.prompt).toBe(
            'Write a game flavor text for a hero which is a character in a Medieval setting'
        );
    });
});
