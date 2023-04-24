import { generate } from 'shortid';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

/**
 * Type definitions and constants/initializers gathered in one place
 * for making extending them easier in the future
 */

//////////////////////////////////
//////////   TYPES   /////////////
//////////////////////////////////

/**
 * ApiRequest to the backend
 */
export interface ApiRequest {
    contexts: string[];
    prompt: string;
    id: string;
    parameters: Parameters;
}

/**
 * ApiResponse from backend
 */
export interface ApiResponse {
    result: string;
    id: string;
}

/**
 * Preset taken from backend
 */
export interface Preset {
    presetName: string;
    creativity: number;
    quality: number;
    inputLength: number;
    outputLength: number;
    promptBase?: PromptStructure;
}

/**
 * Box format as specified for Excel in the documentation
 */
export interface ExcelBox {
    id: string;
    input: string;
    output: string;
}

/**
 * Panel format as specified for Excel in the documentation
 */
export interface ExcelPanel {
    category: string;
    panels: ExcelPanel[];
    boxes: ExcelBox[];
}

/**
 * Excel export format as specified in the documentation
 */
export interface ExcelFormat {
    theme: string;
    panels: ExcelPanel[];
}

/**
 * A theme for a project, defining the overall style of the project and global parameters that
 * are used by default unless overridden by a ContentPanel
 */
export interface Theme {
    name: string;
    globalParameters: Preset;
}

/**
 * Minimum required data for representing a PromptIOBox
 * Should also include the attributes we care about for import/export
 */
export interface PromptData {
    id: string;
    input: string;
    output: string;
    locked: boolean;
}

/**
 * A ContentPanel groups prompts under a common category, and can apply preset or custom
 * parameters to them. ContentPanels make up the bulk of a project's data
 */
export interface ContentPanelData {
    id: string;
    category: string;
    prompts: PromptData[];

    overrideTheme: boolean;
    advancedMode: boolean;
    parameters?: Preset;
}

/**
 * Projects serve as the root class for storing the user content of the application.
 * They should be standalone (i.e. projects do not share data) and be importable/exportable.
 * A user may have multiple projects
 */
export interface Project {
    name: string;
    data: {
        theme: Theme;
        panels: ContentPanelData[];
    };
}

export const AccountSchema = z.object({
    username: z.string(),
    id: z.string(),
});

/**
 * An account is used for registering and logging in users
 */
export type Account = z.infer<typeof AccountSchema>;

export const ProjectInfoSchema = z.object({
    id: z.string(),
    name: z.string(),
});

/**
 * ProjectInfo contains the header data of a project, and can be
 * used to fetch the full project from a database
 */
export type ProjectInfo = z.infer<typeof ProjectInfoSchema>;

/**
 * Structure for prompt generation, given in the form of
 * <prefix> {input} <categoryText> {category} <themeText> {theme} <suffix>
 * eg.
 * "Write a game flavour text for {input} which is a {category} in a {theme} setting"
 */
export type PromptStructure = {
    prefix: string;
    categoryText: string;
    themeText: string;
    suffix: string;
};

export const ParametersSchema = z.object({
    creativity: z.number().min(0).max(1),
    quality: z.number().int().min(1).max(9),
    inputLength: z.number().int().min(1024).max(8000),
    outputLength: z.number().int().min(0).max(5),
});

/**
 * Parameters control the details of the AI generation, from a high level perspective.
 * The underlying interpretation of each parameter can be AI specific, and may influence
 * multiple aspects of the AI in a complex way. This is generally hidden from the user and is handled
 * by the backend.
 */
export interface Parameters extends z.infer<typeof ParametersSchema> {
    promptBase?: PromptStructure;
}

//////////////////////////////////
////////   CONSTANTS   ///////////
////////      AND      ///////////
////////  INITIALIZERS   /////////
//////////////////////////////////

/**
 * Default prompt structure if it is undefined
 */

export const DEFAULT_PROMPT_STRUCTURE: PromptStructure = {
    prefix: 'Write a game flavor text for',
    categoryText: 'which is a',
    themeText: 'in a',
    suffix: 'setting',
};

/**
 * Default params to use when no preset is specified
 */
export const DEFAULT_PARAMETERS: Parameters = {
    creativity: 0.5,
    quality: 7,
    inputLength: 5000,
    outputLength: 4,
};

/**
 * Initial empty state of a projects theme
 */
export const DEFAULT_THEME: Theme = {
    name: '',
    globalParameters: { presetName: 'Select a preset', ...DEFAULT_PARAMETERS },
};

/**
 * Empty template for promptIOBox
 */
export const createEmptyPrompt = (): PromptData => {
    return { id: uuidv4(), input: '', output: '', locked: false };
};

/**
 * Empty template for a panel
 */
export const createEmptyPanel = (): ContentPanelData => {
    return {
        id: generate(),
        category: '',
        prompts: [createEmptyPrompt()], // By default, there is one promptIOBox
        overrideTheme: false,
        advancedMode: false,
    };
};

/**
 * Empty project template for initializing new projects, or setting up the initial
 * state of the redux store
 */
export const createEmptyProject = (): Project => {
    return {
        name: 'new project',
        data: {
            theme: DEFAULT_THEME,
            panels: [createEmptyPanel()], // A project contains at least one panel
        },
    };
};
