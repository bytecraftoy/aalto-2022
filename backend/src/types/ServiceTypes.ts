/**
 * Types for the services
 */

/**
 * Type for the checkPassword function return value
 */
export interface RequestInfo {
    success: boolean;
    message: string;
}

export const DEFAULT_ERROR: RequestInfo = {
    success: false,
    message: 'Something went wrong, please retry.',
};
