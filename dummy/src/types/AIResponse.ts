interface AIData {
    text: string;
    index: number;
    logprobs: number | null;
    finish_reason: string;
}

interface AIUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

interface AIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: AIData[];
    usage: AIUsage[];
}

export { AIResponse, AIData, AIUsage };
