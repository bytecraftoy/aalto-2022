import { selectProjectsbyUserID } from '../db/queries';
import { ApiRequest } from '../types';
import { GenerationRequestJsonSchema } from '../types/ApiTypes';

class ValidationError extends SyntaxError {
    name = 'ValidationError';
}

/**
 * Parse the JSON and return the value returned by JSON.parse().
 * Throws a ValidationError if JSON.parse() fails.
 */
const parseJSON = (json: string): ApiRequest => {
    try {
        return JSON.parse(json) as ApiRequest;
    } catch (e) {
        throw new ValidationError((e as SyntaxError).message);
    }
};

/**
 * Backend level validation.
 * Checks that body is json, and
 * contains the necessary fields for an ApiRequest
 *
 * Also checks that the prompt is not empty. not accounting for whitespace.
 * This error should not be seen while interacting with the UI. i.e. it should
 * also be handled on the frontend.
 *
 * Currently does not check type of fields
 */
// eslint-disable-next-line @typescript-eslint/require-await
const validateApiRequest = async (body: string): Promise<ApiRequest> => {
    const obj = JSON.parse(body);
    GenerationRequestJsonSchema.parse(obj);
    return obj as ApiRequest;
};

export { validateApiRequest, ValidationError };
