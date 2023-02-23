import { createPrompt } from '../services';

describe('Prompt creation', () => {
    test('Returns a prompt with valid parameters', () => {
        const prompt = createPrompt(['Medieval', 'character'], 'a hero');
        expect(prompt.max_tokens).toBeGreaterThan(200);
        expect(prompt.model).toBe('text-davinci-002');
        expect(prompt.prompt).toBe(
            'Write a game flavor text for a hero which is a character in a Medieval setting'
        );
    test('Returns a prompt with valid parameters, high quality', () => {
        const prompt = createPrompt(
            ['Medieval'],
            'Backstory for a hero',
            0.5,
            9,
            1024,
            5
        );
        expect(prompt.max_tokens).toBeGreaterThan(3000);
        expect(prompt.model).toBe('text-davinci-003');
        expect(prompt.prompt).toBe('Theme: Medieval\nBackstory for a hero:');
    });

    test('Returns a prompt with valid parameters, low quality', () => {
        const prompt = createPrompt(
            ['Medieval'],
            'Backstory for a hero',
            0.5,
            2,
            1024,
            5
        );
        expect(prompt.max_tokens).toBeLessThan(3000);
        expect(prompt.model).toBe('text-babbage-001');
        expect(prompt.prompt).toBe('Theme: Medieval\nBackstory for a hero:');
    });
});
