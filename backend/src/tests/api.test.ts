import { app } from './../app';
import { createPrompt } from '../services';
import { TokenPayload } from '../types/TokenPayload';
import { createToken, createUser } from '../services/userService';
import supertest from 'supertest';

const api = supertest(app);

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
