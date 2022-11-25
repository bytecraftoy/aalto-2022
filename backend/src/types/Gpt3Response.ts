/**
 * Gpt3 type to aid in correct OpenAI formatting
 */

interface Choice {
    text: string;
    index: number;
    logprobs: number;
    finish_reason: string;
}

interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

interface Gpt3Response {
    id: string;
    object: string;
    created: number;
    choices: ReadonlyArray<Choice>;
    usage: Usage;
}

export { Gpt3Response };
