import { apiFetch } from './apiFetch';

/**
 * Request AI generated text from the backend
 */
const generateText = async (input: string, category: string) => {
    //Simulate delay
    await new Promise((r) => setTimeout(r, 800));

    try {
        return await apiFetch('/mirror/', {
            method: 'POST',
            body: `${input} ${category}`,
        });
    } catch (e) {
        console.error(e);
        return '';
    }
};

export { generateText };
