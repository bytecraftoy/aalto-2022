/**
 * This middleware reads the token cookie from the request
 * and adds a new 'token' property to the request object.
 * If a valid token is found in the cookie,
 * the token information is saved to the new token property
 * as an instance of TokenPayload.
 * Otherwise the value of the token property is null.
 */
import { Request, Response } from 'express';
import { TokenPayload } from '../types/TokenPayload';
import { readToken } from './../services/tokenService';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            token: TokenPayload | null;
        }
    }
}

const tokenReader = async (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): Promise<void> => {
    req.token = await readToken(req);
    next();
};

export { tokenReader };
