import { backendURL } from './backendURL';

/**
 * Fetch text data from backend using relative path.
 * Throws an error if the request wasn't successful.
 */
const apiFetch = async (path: string, init?: RequestInit | undefined) => {
    init = {
        credentials: 'include',
        ...(init || {}),
    };
    const res = await fetch(`${backendURL}${path}`, init);
    if (!res.ok)
        throw new Error('request failed with status code ' + res.status);
    return await res.text();
};

/**
 * Fetch JSON data from backend using relative path.
 * Parses the data before returning.
 * Throws an error if the request wasn't successful or if the parsing fails.
 */
const apiFetchJSON = async (path: string, init?: RequestInit | undefined) => {
    const text = await apiFetch(path, init);
    return JSON.parse(text);
};

export { apiFetch, apiFetchJSON };
