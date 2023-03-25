import { apiFetchJSON } from './apiFetch';

/**
 * Retrieves the status of the backend
 */
export const getStatus = async () => {
    return await apiFetchJSON('/api/status');
};
