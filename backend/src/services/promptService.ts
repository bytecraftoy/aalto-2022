import fs from 'fs';
import { Prompt, Preset } from '../types';

const presets = JSON.parse(
    fs.readFileSync('files/presets.json').toString()
) as Preset[];

const defaultPreset: Preset = {
    name: 'default',
    parameters: {
        model: 'text-davinci-002',
        prompt: '',
        temperature: 0.5,
        max_tokens: 300,
        top_p: 0.999,
        frequency_penalty: 0.52,
        presence_penalty: 0.5,
    },
};

const convertParameters = (
    creativity: number,
    quality: number,
    inputLength: number,
    outputLength: number
) => {
    //calculations here

    const result = {
        name: 'custom',
        parameters: {
            model: 'text-davinci-002',
            prompt: '',
            temperature: 0.5,
            max_tokens: 300,
            top_p: 0.999,
            frequency_penalty: 0.52,
            presence_penalty: 0.5,
        },
    };
    return result;
};

/**
 * Create a prompt by combining contexts, a user provided text prompt, and
 * AI parameters taken from some preset.
 */
export const createPrompt = (
    contexts: string[],
    text: string,
    creativity: number,
    quality: number,
    inputLength: number,
    outputLength: number,
    preset = ''
): Prompt => {
    //Retrieve a preset by name, or the default preset if undefined
    //TODO: figure out what to do with this
    //const template = presets.find((p) => p.name === preset) ?? defaultPreset;
    //const result = template.parameters;

    const result = convertParameters(
        creativity,
        quality,
        inputLength,
        outputLength
    ).parameters;

    //Gpt3 works with prompts that are formatted such as
    //Theme: Medieval fantasy\nBackstory of a knight with black armor and a magic sword:

    const theme = contexts.length ? `Theme: ${contexts[0]}\n` : '';
    result.prompt = `${theme}${text}:`;
    return result;
};
