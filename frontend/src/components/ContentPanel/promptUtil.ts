import { generateText } from '../../utils/generateContent';
import { InputSchema, PromptData } from '../PromptIOBox';
/**
 * Creates an <id, output> map of generated prompts
 * @param prompts
 * @param category
 * @returns {Promsie<Map<string,string>>} generatedPrompts
 */
export const generatePrompts = async (
    prompts: PromptData[],
    category: string
): Promise<Map<string, string>> => {
    // Map of <id, output> for content panels that are generated
    const generated: Map<string, string> = new Map();

    // Goes through the promptboxes and adds the map a new entry for ids which are not locked
    for (const p of prompts) {
        // Generate if the prompt is not locked and input is valid
        if (!p.locked && InputSchema.safeParse(p.input).success) {
            const output: string = await generateText(p.id, p.input, category);
            generated.set(p.id, output);
        }
    }
    return generated;
};
