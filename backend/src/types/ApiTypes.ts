interface ApiRequest {
    contexts: string[];
    prompt: string;
    id: string;
}

interface ApiResponse {
    result: string;
    id: string;
}

export { ApiRequest, ApiResponse };
