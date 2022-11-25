import supertest from 'supertest';
import { server } from './../index';
import { AIResponse } from '../types/AIResponse';

const api = supertest(server);

describe('textgen router', () => {
    test('gives a response in the correct format', async () => {
        const response = await api
            .post('/')
            .send(
                `{
                "model": "text-davinci-002",
                "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
                "temperature": 0.5,
                "max_tokens": 2000,
                "top_p": 1.0,
                "frequency_penalty": 0.52,
                "presence_penalty": 0.5
            }`
            )
            .expect(200);

        //Unix timestamp
        const time = new Date().valueOf();
        console.log(time);
        expect((response.body as AIResponse).created).toBeDefined();
        const t = (response.body as AIResponse).created;
        expect(Math.abs(time - t)).toBeLessThan(100);
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
