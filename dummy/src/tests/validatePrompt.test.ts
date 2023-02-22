import { validatePrompt, ValidationError } from './../services/validatePrompt';

/**
 * Returns the error message if validatePrompt throws a ValidationError,
 * true if some other error is thrown, and false if no error was thrown.
 */
const getPromptValidationError = (prompt: string): string | boolean => {
    try {
        validatePrompt(prompt);
        return false;
    } catch (e) {
        if (e instanceof ValidationError) return e.message;
        return true;
    }
};

describe('prompt validation', () => {
    test('accepts a valid JSON', () => {
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe(false);
    });
    test('rejects invalid JSON', () => {
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe('top_p is not a float');
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000.0,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe('max_tokens is not an integer');
        expect(
            getPromptValidationError(`{
            "model": "invalid model",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe(
            'model is not recognized. Valid models: text-davinci-002,text-davinci-003,text-babbage-001,text-curie-001,text-ada-001'
        );
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": " ",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe('prompt is not a non-empty string');
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "top_p": 1.0,
            "best_of": 1
        }`)
        ).toBe('duplicate fields detected');
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 255,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe('max_tokens is not a number between 256 and 4000');
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1.0,
            "frequency_penalty": 1.52,
            "presence_penalty": 0.5,
            "best_of": 1
        }`)
        ).toBe('frequency_penalty is not a number between 0 and 1');
        expect(
            getPromptValidationError(`{
            "model": "text-davinci-002",
            "prompt": "Write flavor text for a cyberpunk soldier in a dystopian board game:",
            "temperature": 0.5,
            "max_tokens": 2000,
            "top_p": 1.0,
            "frequency_penalty": 0.52,
            "presence_penalty": 0.5,
            "extra_property": 0.5,
            "best_of": 1
        }`)
        ).toBe('too many properties');
        expect(getPromptValidationError(`[1, 2]`)).toBe(
            'data does not represent a plain object'
        );
        expect(getPromptValidationError(`null`)).toBe(
            'data does not represent a plain object'
        );
        expect(typeof getPromptValidationError(`abc`)).toBe('string');
    });
});
