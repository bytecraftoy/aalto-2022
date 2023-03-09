import { apiFetch, RequestError } from './apiFetch';
import { EventBus } from './eventBus';

/**
 * A helper funciton to turn an error thrown by apiFetch into an error message
 */
const extractErrorMessage = async (e: unknown): Promise<string> => {
    if (e instanceof RequestError) {
        const text = await e.response.text();
        if (text) return text;
    }
    return 'Failed to change your password.';
};

/**
 * A helper function that request back-end to change the password
 * and returns a message and a type of a notification to show to the user.
 */
const sendRequest = async (
    currentPassword: string,
    newPassword: string
): Promise<[string, 'success' | 'error']> => {
    try {
        await apiFetch('/api/user/password/', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        return ['Your password has been changed.', 'success'];
    } catch (e) {
        console.error(e);
        return [await extractErrorMessage(e), 'error'];
    }
};

/**
 * Sends a request to change the password
 * and displays the user a notification both on success and on error.
 * Never throws an error.
 */
export const changePassword = async (
    currentPassword: string,
    newPassword: string
) => {
    const [message, type] = await sendRequest(currentPassword, newPassword);
    EventBus.dispatch('notification', {
        message,
        type,
    });
};
