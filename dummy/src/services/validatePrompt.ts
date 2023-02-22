import { Prompt } from './../types/Prompt';

class ValidationError extends SyntaxError {
    name = 'ValidationError';
}

/**
 * Throw a ValidationError if some property is defined multiple times in the JSON.
 * Expects the JSON to represent an object with no nested objects.
 * Won't work correctly if some string literal in the JSON ends with a "
 * followed by a valid field name.
 */
const validateForDuplicateFields = (prompt: string): void => {
    const fields = [
        '"model"',
        '"prompt"',
        '"temperature"',
        '"max_tokens"',
        '"top_p"',
        '"frequency_penalty"',
        '"presence_penalty"',
        '"best_of"',
    ];
    for (const name of fields) {
        if (prompt.indexOf(name) !== prompt.lastIndexOf(name))
            throw new ValidationError('duplicate fields detected');
    }
};

/**
 * Parse the JSON and return the value returned by JSON.parse().
 * Throws a ValidationError if JSON.parse() fails.
 */
const parseJSON = (json: string): Prompt => {
    try {
        return JSON.parse(json) as Prompt;
    } catch (e) {
        throw new ValidationError((e as SyntaxError).message);
    }
};

/**
 * Check that the object has all required properties with acceptable values.
 * Does not allow extra properties to exist.
 * Throws a ValidationError if something isn't correct.
 */
const validateProperties = (obj: Prompt): void => {
    const validModels = [
        'text-davinci-002',
        'text-davinci-003',
        'text-babbage-001',
        'text-curie-001',
        'text-ada-001',
    ];
    if (obj === null || obj.constructor !== Object)
        throw new ValidationError('data does not represent a plain object');
    else if (!validModels.includes(obj.model))
        throw new ValidationError(
            `model is not recognized. Valid models: ${validModels}`
        );
    else if (typeof obj.prompt !== 'string' || obj.prompt.trim().length === 0)
        throw new ValidationError('prompt is not a non-empty string');
    else if (
        typeof obj.temperature !== 'number' ||
        obj.temperature < 0 ||
        obj.temperature > 1
    )
        throw new ValidationError(
            'temperature is not a number between 0 and 1'
        );
    else if (
        typeof obj.max_tokens !== 'number' ||
        obj.max_tokens < 256 ||
        obj.max_tokens > 8000
    )
        throw new ValidationError(
            'max_tokens is not a number between 256 and 4000'
        );
    else if (typeof obj.top_p !== 'number' || (obj.top_p < 0 && obj.top_p > 1))
        throw new ValidationError('top_p is not a number between 0 and 1');
    else if (
        typeof obj.frequency_penalty !== 'number' ||
        obj.frequency_penalty < 0 ||
        obj.frequency_penalty > 1
    )
        throw new ValidationError(
            'frequency_penalty is not a number between 0 and 1'
        );
    else if (
        typeof obj.presence_penalty !== 'number' ||
        obj.presence_penalty < 0 ||
        obj.presence_penalty > 1
    )
        throw new ValidationError(
            'presence_penalty is not a number between 0 and 1'
        );
    else if (typeof obj.best_of !== 'number' || obj.best_of < 0)
        throw new ValidationError('best_of is not a positive integer');
    else if (Object.keys(obj).length !== 8)
        throw new ValidationError('too many properties');
};

/**
 * Get a raw string representation of the number value of a property.
 * Expects the value to be found between : and , or } characters after
 * the property name that is surrounded by quotation marks.
 * May not work correctly if some string literal in the JSON ends with a "
 * followed by a valid field name.
 * Should be called after validateProperties().
 */
const getNumberPropValue = (prompt: string, name: string): string => {
    const propName = `"${name}"`;
    let i = prompt.indexOf(propName);
    //this is not a validation error since this error should not occur
    //if other validations have been done
    if (i === -1) throw new Error(`Unable to find ${propName} from prompt`);
    i += propName.length;
    //the initial values for these variables aren't really important
    let start = 0;
    let end = prompt.length;
    for (; i < prompt.length; i++) {
        const c = prompt.charAt(i);
        if (c === ':') start = i + 1;
        else if (c === ',' || c === '}') {
            end = i;
            break;
        }
    }
    return prompt.slice(start, end).trim();
};

/**
 * Returns true if the string has length > 0
 * and includes only numbers from 0 to 9.
 */
const isNumeric = (str: string): boolean => {
    if (str.length === 0) return false;
    for (const c of str) {
        const code = c.charCodeAt(0);
        if (code < 48 || code > 57) return false;
    }
    return true;
};

/**
 * Checks that the string 'value' is a valid int or float literal
 * depending on the value of 'shouldBeInt'.
 * Throws a ValidationError if someting isn't correct.
 */
const validateNumberType = (
    name: string,
    value: string,
    shouldBeInt: boolean
): void => {
    const parts = value.split('.');
    if (shouldBeInt) {
        if (parts.length !== 1 || !parts.every((v) => isNumeric(v)))
            throw new ValidationError(`${name} is not an integer`);
    } else {
        if (parts.length !== 2 || !parts.every((v) => isNumeric(v)))
            throw new ValidationError(`${name} is not a float`);
    }
};

/**
 * Checks that all of the required number types of a prompt
 * are valid int or float literals depending on their required type.
 * Throws a ValidationError if someting isn't correct.
 */
const validateNumberTypes = (prompt: string): void => {
    const toCheck: { name: string; shouldBeInt: boolean }[] = [
        { name: 'temperature', shouldBeInt: false },
        { name: 'max_tokens', shouldBeInt: true },
        { name: 'top_p', shouldBeInt: false },
        { name: 'frequency_penalty', shouldBeInt: false },
        { name: 'presence_penalty', shouldBeInt: false },
        { name: 'best_of', shouldBeInt: true },
    ];
    for (const prop of toCheck) {
        const value = getNumberPropValue(prompt, prop.name);
        validateNumberType(prop.name, value, prop.shouldBeInt);
    }
};

/**
 * Validates the prompt JSON string.
 * Throws a ValidationError if someting isn't correct.
 */
const validatePrompt = (prompt: string): void => {
    if (typeof prompt !== 'string')
        throw new ValidationError('data is not a string');
    validateForDuplicateFields(prompt); //JSON.parse allows duplicate fields to exist
    const obj: Prompt = parseJSON(prompt);
    validateProperties(obj);
    validateNumberTypes(prompt); //in JS all numbers are floats
};

export { ValidationError, validatePrompt };
