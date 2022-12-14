import { ApiRequest } from '../types';

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
 * Function assisting in prompt validation,
 * checks that all correct properties exist, returns boolean value
 *
 * @param {ApiRequest} json
 * @returns {Boolean}
 */
const correctPropertiesExist = (json: ApiRequest) => {
    return 'contexts' in json && 'prompt' in json && 'id' in json;
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
    const obj = parseJSON(body);
    if (!correctPropertiesExist(obj)) {
        throw new ValidationError(
            'Request does not contain all required properties'
        );
    }

    if (obj.prompt.trim() == '') {
        throw new ValidationError('Request prompt is empty');
    }

    if (Object.keys(obj).length !== 3) {
        throw new ValidationError(
            'Request contains the incorrect number of properties'
        );
    }

    return JSON.parse(body) as ApiRequest;
};

export { validateApiRequest, ValidationError };
