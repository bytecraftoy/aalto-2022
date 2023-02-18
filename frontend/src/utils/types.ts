import { PromptData } from '../components/ContentPanel/ContentPanelPrompts/PromptIOBox';
import { z } from 'zod';

/**
 * Convinience file containing type definitions for readability
 */

/** Type returned by useState() : (A | (prev: A) => A) => void */
export type StateHook<A> = React.Dispatch<React.SetStateAction<A>>;

//ApiRequest and ApiResponse types taken from backend

export interface ApiRequest {
    contexts: string[];
    prompt: string;
    id: string;
    parameters: Parameters;
}

export interface ApiResponse {
    result: string;
    id: string;
}

export interface ContentPanelType {
    id: string;
    category: string;
    prompts: PromptData[];
    parameters: Parameters;
}

export const AccountSchema = z.object({
    username: z.string(),
    id: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;

export const ProjectInfoSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type ProjectInfo = z.infer<typeof ProjectInfoSchema>;

export const ParametersSchema = z.object({
    creativity: z.number().min(0).max(1),
    quality: z.number().min(0).max(9),
    inputLength: z.number().min(0).max(10000),
    outputLength: z.number().min(0).max(1),
});

export type Parameters = z.infer<typeof ParametersSchema>;
export const DEFAULT_PARAMETERS = {
    creativity: 0,
    quality: 0,
    inputLength: 2000,
    outputLength: 0.6,
} as const;
