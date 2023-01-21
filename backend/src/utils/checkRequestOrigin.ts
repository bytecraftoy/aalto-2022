import { Request } from 'express';

/**
 * Checks that the origin header matches the host header.
 * This is required to prevent CSRF attacks.
 * Returns true if everything looks good and false otherwise.
 * Never throws an error.
 */
const checkRequestOrigin = (req: Request): boolean => {
    const origin = req.headers['origin'];
    const host = req.headers['host'];
    if (origin && host) return origin.endsWith(host);
    else return false;
};

export { checkRequestOrigin };
