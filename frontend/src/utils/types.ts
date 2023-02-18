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
}

export interface ApiResponse {
    result: string;
    id: string;
}

export interface ContentPanelType {
    id: string;
    category: string;
    prompts: PromptData[];
}

export interface Project {
    name: string;
    data: {
        panels: ContentPanelType[];
    };
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
