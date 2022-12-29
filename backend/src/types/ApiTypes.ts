import { z } from 'zod';

/*
 * Zod validation schema
 * Parse untrusted like so:
 * const validated = apiRequestSchema.parse(userInputDict)
 */
const apiRequestSchema = z.object({
    contexts: z.array(z.string()),
    prompt: z.string().trim().min(1, 'Trimmed prompt should not be empty'),
    id: z.string().uuid(),
});

// Generate the actual type from the schema at compile time
type ApiRequest = z.infer<typeof apiRequestSchema>;

const apiResponseSchema = z.object({
    result: z.string(),
    id: z.string().uuid(),
});

type ApiResponse = z.infer<typeof apiResponseSchema>;

export { apiRequestSchema, ApiRequest, apiResponseSchema, ApiResponse };
