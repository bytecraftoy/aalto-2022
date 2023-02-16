export interface ApiRequest {
    contexts: string[];
    prompt: string;
    id: string;
    creativity: number;
    quality: number;
    inputLength: number;
    outputLength: number;
}

export interface ApiResponse {
    result: string;
    id: string;
}
