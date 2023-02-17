import { apiFetchJSON } from './apiFetch';
import { ApiRequest, ApiResponse, Parameters } from './types';

type generateTextProps = {
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
    //Simulate delay for now

    const req: ApiRequest = {
        id: id,
        contexts: [category],
        prompt: input,
        parameters,
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
