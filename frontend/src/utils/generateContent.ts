import { apiFetchJSON } from './apiFetch';
import { ApiRequest, ApiResponse, Parameters } from './types';

export type generateTextProps = {
    id: string;
    input: string;
    category: string;
    parameters: Parameters;
};

/**
 * Request AI generated text from the backend.
 */
const generateText = async ({
    id,
    input,
    category,
    parameters,
}: generateTextProps) => {
    //Simulate delay for dev mode
    if (process.env.NODE_ENV === 'development') {
        await new Promise((r) => setTimeout(r, 800));
    }

    const req: ApiRequest = {
        id: id,
        //TODO: replace 'Sci-fi' with the theme once implemented
        contexts: ['Sci-fi', category],
        prompt: input,
        parameters,
    };

    try {
        const response = (await apiFetchJSON('/api/textgen', {
            method: 'POST',
            body: JSON.stringify(req),
        })) as ApiResponse;
        return response.result;
    } catch (e) {
        console.error(e);
        return `Text generation failed: ${e}`;
    }
};

export { generateText };
