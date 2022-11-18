import supertest from 'supertest';
import {server} from './../index';
import fs from 'fs';

const api = supertest(server);

const exampleData: string = fs.readFileSync('example_data.txt').toString();
console.log(exampleData);

describe('textgen router', () => {
    test('gives correct response', async () => {
        const response = await api
            .post('/')
            .send(`{
                "model": "text-davinci-002",
                "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
                "temperature": 0.5,
                "max_tokens": 2000,
                "top_p": 1.0,
                "frequency_penalty": 0.52,
                "presence_penalty": 0.5
            }`)
            .expect(200);
        const time = (new Date()).toUTCString();
        console.log(time);
        expect(response.text)
        .toBe(`${time}\nWrite flavor text for a cyberpunk soldier in a dystopian board game:\n${exampleData}`);
    });
    test('handles errors correctly', async () => {
        const response = await api
            .post('/')
            .send(`{
                "model": "text-davinci-002",
                "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
                "temperature": 0.5,
                "max_tokens": 2000,
                "top_p": 1,
                "frequency_penalty": 0.52,
                "presence_penalty": 0.5
            }`)
            .expect(400);
        const time = (new Date()).toUTCString();
        console.log(time);
        expect(response.text)
        .toBe('ValidationError: top_p is not a float');
    });
});