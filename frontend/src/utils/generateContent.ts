import { apiFetchJSON } from './apiFetch';
import { ApiRequest, ApiResponse } from './types';

/**
 * Request AI generated text from the backend.
 */
const generateText = async (id: string, input: string, category: string) => {
    //Simulate delay for now

    const req: ApiRequest = {
        id: id,
        contexts: [category],
        prompt: input,
    };

    await new Promise((r) => setTimeout(r, 800));

    try {
        const response = (await apiFetchJSON('/api/textgen', {
            method: 'POST',
            body: JSON.stringify(req),
        })) as ApiResponse;
        return response.result;
    } catch (e) {
        console.error(e);
        return 'Text generation failed';
    }
};

export { generateText };
