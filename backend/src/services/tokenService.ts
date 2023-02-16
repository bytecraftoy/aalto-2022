import { Request, CookieOptions } from 'express';
import { logger } from './../utils/logger';
import { parseToken } from './userService';
import { TokenPayload } from './../types/TokenPayload';
import { isDevelopment } from '../utils/env';

const tokenCookieName = 'user-token';

const tokenCookieOptions: CookieOptions = {
    //the cookie must be unsecure in development
    //since otherwise browser won't send it over unsecure http
    secure: !isDevelopment(),
    httpOnly: true,
    sameSite: 'strict',
};

/**
 * Read token payload from a request object.
 * Returns null if the token is not found or is invalid.
 * Never rejects.
 */
const readToken = async (req: Request): Promise<TokenPayload | null> => {
    const token: unknown = req.cookies[tokenCookieName];
    if (typeof token !== 'string') return null;
    if (token === '-') return null;
    try {
        return await parseToken(token);
    } catch (e) {
        logger.error('parse_token_fail', { e });
    }
    return null;
};

export { tokenCookieName, tokenCookieOptions, readToken };
