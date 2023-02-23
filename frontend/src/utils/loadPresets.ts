import { apiFetchJSON } from './apiFetch';
import { Preset } from './types';

/**
 * Utilities for fetching presets from the backend
 */

/**
 * A helper function for handling errors
 */
const handleError = (err: unknown): { success: false; error: Error } => {
    console.error(err);
    return {
        success: false,
        error: err instanceof Error ? err : new Error(),
    };
};

/**
 * load presets from the backend
 */
export const loadPresets = async (): Promise<
    | { success: true; presets: Preset[] }
    | { success: false; error: Error }
> => {
    try {
        const presets = await apiFetchJSON('/api/presets');
        return { success: true, ...presets };
    } catch (err) {
        return handleError(err);
    }
};
