import { apiFetchJSON } from './apiFetch';
import {
    ApiRequest,
    ApiResponse,
    DEFAULT_PROMPT_STRUCTURE,
    Parameters,
} from './types';

export type generateTextProps = {
    id: string;
    input: string;
    theme: string;
    category: string;
    parameters: Parameters;
};

/**
 * Request AI generated text from the backend.
 */
const generateText = async ({
    id,
    input,
    theme,
    category,
    parameters,
}: generateTextProps) => {
    //Simulate delay for dev mode
    if (process.env.NODE_ENV === 'development') {
        await new Promise((r) => setTimeout(r, 800));
    }

    const promptBase = parameters.promptBase ?? DEFAULT_PROMPT_STRUCTURE;

    const text = `${promptBase.prefix} ${input} ${promptBase.categoryText} ${category} ${promptBase.themeText} ${theme} ${promptBase.suffix}`;

    const req: ApiRequest = {
        id: id,
        contexts: [theme, category],
        prompt: text,
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
