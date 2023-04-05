/**
 * helper function that generates a random string
 * useful for creating id strings
 */
const chars =
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Get a random string of length 'length' consisting of numbers and big and small letters
 */
const getRndString = (length: number): string => {
    let s = '';
    for (let i = 0; i < length; i++)
        s += chars[Math.floor(Math.random() * chars.length)];
    return s;
};

export { getRndString };
