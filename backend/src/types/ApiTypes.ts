import { z } from 'zod';

export const ParametersSchema = z.object({
    creativity: z.number().min(0).max(1),
    quality: z.number().min(0).max(9),
    inputLength: z.number().min(0).max(10000),
    outputLength: z.number().min(0).max(1),
});

export type Parameters = z.infer<typeof ParametersSchema>;

export const GenerationRequestJsonSchema = z.object({
    contexts: z.array(z.string()),
    prompt: z.string().min(1),
    id: z.string(),
    parameters: ParametersSchema,
});

export interface ApiRequest {
    //the current implementation requires there to be exactly 2 contexts:
    //the theme and the category
    contexts: [string, string];
    prompt: string;
    id: string;
    parameters: Parameters;
}

export interface ApiResponse {
    result: string;
    id: string;
}
