/**
 * Gpt3 type to aid in correct OpenAI formatting
 */

interface Choice {
    text: string;
    index: number;
    logprobs: number | null;
    finish_reason: string;
}

interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface Gpt3Response {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
}
