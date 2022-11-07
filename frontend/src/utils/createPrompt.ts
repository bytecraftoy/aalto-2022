/**
 * Create a prompt based on category and input
 * May be expanded upon later
 */
const createPrompt = (category: string, input: string) => {
    const uuid = crypto.randomUUID();
    return `Request: ${uuid}\nCategory: ${category}\nInput: ${input}\n`;
};

export { createPrompt };
