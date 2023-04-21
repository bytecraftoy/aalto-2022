/**
 * Service file that converts our own parameter settings to
 * parameters accepted by the API, as well as generating the
 * prompt in correct form.
 */
import { Prompt, Preset } from '../types';

/**
 * Converts our own parameters into GPT-approved parameters according to discussed upon factors
 *
 * @returns custom preset with correctly converted parameters
 */

const convertParameters = (
    creativity: number,
    quality: number,
    inputLength: number,
    outputLength: number
): Preset => {
    //cut the input length, normally between 1024-8000,
    //to 4000 if quality 1-3, also halves max_tokens
    let cutInputLength = inputLength;
    let maxTokenFactor = 1;
    if (quality < 4) {
        if (inputLength > 4000) {
            cutInputLength = 4000;
        }
        maxTokenFactor = 0.5;
    }

    const temperature = creativity * (4 / 5) + 0.2;
    const presence_penalty = creativity * (3 / 5);
    const frequency_penalty = creativity * (1 / 2);
    const top_p = 1;
    const max_tokens = Math.round(
        ((Math.floor((15872 - cutInputLength) / 4) * outputLength) / 5) *
            maxTokenFactor
    );
    const best_of = Math.max(1, quality - 3);
    let model = 'text-davinci-003';
    switch (quality) {
        case 1:
            model = 'text-ada-001';
            break;
        case 2:
            model = 'text-babbage-001';
            break;
        case 3:
            model = 'text-curie-001';
    }
    const result = {
        name: 'custom',
        parameters: {
            model: model,
            prompt: '',
            temperature: temperature,
            max_tokens: max_tokens,
            top_p: top_p,
            frequency_penalty: frequency_penalty,
            presence_penalty: presence_penalty,
            best_of: best_of,
        },
    };
    return result;
};

/**
 * Create a prompt by combining contexts, a user provided text prompt, and
 * AI parameters taken from some preset.
 */
export const createPrompt = (
    //the current implementation requires there to be exactly 2 contexts:
    //the theme and the category
    contexts: [string, string],
    text: string,
    creativity: number,
    quality: number,
    inputLength: number,
    outputLength: number
): Prompt => {
    const template = convertParameters(
        creativity,
        quality,
        inputLength,
        outputLength
    );

    const result = template.parameters;

    //Gpt3 works with prompts that are formatted such as
    //Theme: Medieval fantasy\nBackstory of a knight with black armor and a magic sword:

    const theme = contexts[0];
    const category = contexts[1];
    result.prompt = `Write a game flavor text for ${text} which is a ${category} in a ${theme} setting`;
    return result;
};
