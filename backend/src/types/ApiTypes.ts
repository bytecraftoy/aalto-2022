import { z } from 'zod';

const apiRequestSchema = z.object({
    contexts: z.array(z.string()),
    prompt: z.string().trim().min(1, 'Trimmed prompt should not be empty'),
    id: z.string().uuid(),
});

type ApiRequest = z.infer<typeof apiRequestSchema>;

const apiResponseSchema = z.object({
    result: z.string(),
    id: z.string().uuid(),
});

type ApiResponse = z.infer<typeof apiResponseSchema>;

export { apiRequestSchema, ApiRequest, apiResponseSchema, ApiResponse };
