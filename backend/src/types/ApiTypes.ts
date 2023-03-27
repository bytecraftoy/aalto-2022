/**
 * Defines schemas used for communication between frontend and backend
 * zod is useful for validation.
 */
import { z } from 'zod';

export const ParametersSchema = z.object({
    creativity: z.number().min(0).max(1),
    quality: z.number().int().min(1).max(9),
    inputLength: z.number().int().min(1024).max(8000),
    outputLength: z.number().int().min(0).max(5),
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
