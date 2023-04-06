/**
 * Defines the type for a preset
 */
import { Prompt } from './Prompt';

export interface Preset {
    name: string;
    parameters: Prompt;
}
