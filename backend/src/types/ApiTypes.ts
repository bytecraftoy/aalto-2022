export interface ApiRequest {
    contexts: string[];
    prompt: string;
    id: string;
}

export interface ApiResponse {
    result: string;
    id: string;
}
