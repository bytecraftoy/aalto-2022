/**
 * This middleware prevents anonymous users
 * from accessing sensitive API endpoints.
 * The sensitive endpoints must be added to the app
 * after this middleware.
 * Endpoints that must be available for anonymous users
 * must be added before this middleware.
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
