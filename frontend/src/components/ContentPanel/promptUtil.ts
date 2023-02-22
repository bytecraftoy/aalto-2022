import { generateText, generateTextProps } from '../../utils/generateContent';
import { InputSchema } from './ContentPanelPrompts/PromptIOBox';
import type { PromptData } from '../../utils/types';

export interface generatePromptProps extends Omit<generateTextProps, 'id'> {
    prompts: PromptData[];
}

/**
 * Creates an <id, output> map of generated prompts
 * @param prompts
 * @param category
 * @param parameters
 * @returns {Promise<Map<string,string>>} generatedPrompts
 */
export const generatePrompts = async ({
    prompts,
    category,
    parameters,
}: generatePromptProps): Promise<Map<string, string>> => {
    // Map of <id, output> for content panels that are generated
    const generated: Map<string, string> = new Map();

    // Goes through the promptboxes and adds the map a new entry for ids which are not locked
    for (const p of prompts) {
        // Generate if the prompt is not locked and input is valid
        if (!p.locked && InputSchema.safeParse(p.input).success) {
            const output: string = await generateText({
                id: p.id,
                input: p.input,
                category,
                parameters,
            });
            generated.set(p.id, output);
        }
    }
    return generated;
};
