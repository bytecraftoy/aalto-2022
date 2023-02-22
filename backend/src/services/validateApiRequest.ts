import { ApiRequest } from '../types';
import { GenerationRequestJsonSchema } from '../types/ApiTypes';

class ValidationError extends SyntaxError {
    name = 'ValidationError';
}

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
    const parsed = GenerationRequestJsonSchema.parse(JSON.parse(body));
    //currently we wan there to be exactly two contexts: theme and category
    if (parsed.contexts.length !== 2)
        throw new ValidationError(
            `Found ${parsed.contexts.length} contexts instead of 2`
        );
    return parsed as ApiRequest;
};

export { validateApiRequest, ValidationError };
