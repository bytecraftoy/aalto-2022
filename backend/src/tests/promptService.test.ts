import { createPrompt } from '../services';

describe('Prompt creation', () => {
    test('Returns a prompt with valid parameters', () => {
        const prompt = createPrompt(['Medieval', 'character'], 'a hero');
        expect(prompt.max_tokens).toBeGreaterThan(200);
        expect(prompt.model).toBe('text-davinci-002');
        expect(prompt.prompt).toBe(
            'Write a game flavor text for a hero which is a character in a Medieval setting'
        );
    });
});
