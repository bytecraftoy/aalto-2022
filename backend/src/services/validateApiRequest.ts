import { ApiRequest, apiRequestSchema } from '../types';

/**
 * Backend level validation.
 * Checks that body is json, and
 * contains the necessary fields for an ApiRequest
 *
 * Also checks that the prompt is not empty. not accounting for whitespace.
 * This error should not be seen while interacting with the UI. i.e. it should
 * also be handled on the frontend.
 */
// eslint-disable-next-line @typescript-eslint/require-await
const validateApiRequest = async (body: string): Promise<ApiRequest> => {
    const jsonRaw: unknown = JSON.parse(body);
    return apiRequestSchema.parse(jsonRaw);
};

export { validateApiRequest };
