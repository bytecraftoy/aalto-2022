import supertest from 'supertest';
import { server } from './../index';
import { DummyResponse } from '../types';

const api = supertest(server);

describe('textgen router', () => {
    test('gives a response in the correct format', async () => {
        const prompt = `{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 0.99,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5
        }`;

        const response = await api.post('/').send(prompt).expect(200);

        //Unix timestamp
        const time = Date.now();
        console.log(time);

        const res = response.body as DummyResponse;
        const gpt = res.gpt;
        const debug = res.debug;
        const t = gpt.created;
        expect(Math.abs(time - t)).toBeLessThan(100);
        expect(debug.prompt).toStrictEqual(JSON.parse(prompt));
    });
    test('handles errors correctly', async () => {
        const response = await api
            .post('/')
            .send(
                `{
                "model": "text-davinci-002",
                "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
                "temperature": 0.5,
                "max_tokens": 2000,
                "top_p": 2.5,
                "frequency_penalty": 0.52,
                "presence_penalty": 0.5
            }`
            )
            .expect(400);
        const time = new Date().toUTCString();
        console.log(time);
        expect(response.text).toBe(
            'ValidationError: top_p is not a number between 0 and 1'
        );
    });
});
