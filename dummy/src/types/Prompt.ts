interface Prompt {
    model: string,
    prompt: string,
    temperature: number,
    max_tokens: number,
    top_p: number,
    frequency_penalty: number,
    presence_penalty: number
}

export {Prompt};