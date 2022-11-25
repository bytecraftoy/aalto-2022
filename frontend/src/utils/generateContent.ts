import { apiFetch } from './apiFetch';

/**
 * Request AI generated text from the backend
 */
const generateText = async (input: string, category: string) => {
    //Since the API endpoint hasn't been decided, just make up some string for mirror
    const uuid = crypto.randomUUID();
    const prompt = `Request: ${uuid}\nCategory: ${category}\nInput: ${input}\n`;

    //Simulate delay
    await new Promise((r) => setTimeout(r, 800));

    try {
        return await apiFetch('/mirror/', { method: 'POST', body: prompt });
    } catch (e) {
        console.error(e);
        return '';
    }
};

export { generateText };
