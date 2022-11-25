import { v4 as uuidv4 } from 'uuid';
import { apiFetch } from './apiFetch';

/**
 * Request AI generated text from the backend.
 * This should query the dummy once it is finished.
 * For now, request from mirror
 */
const generateText = async (input: string, category: string) => {
    //Simulate delay for mirror
    await new Promise((r) => setTimeout(r, 800));

    try {
        return await apiFetch('/mirror/', {
            method: 'POST',
            body: `---Mirror---\ncategory: ${category}\ninput: ${input}\n${uuidv4()}`,
        });
    } catch (e) {
        console.error(e);
        return '';
    }
};

export { generateText };
