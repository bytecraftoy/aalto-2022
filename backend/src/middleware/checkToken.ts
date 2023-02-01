import { Request, Response } from 'express';
import { readToken } from './../services/tokenService';

/**
 * This middleware prevents anonymous users
 * from accessing sensitive API endpoints.
 * The sensitive endpoints must be added to the app
 * after this middleware.
 * Endpoints that must be available for anonymous users
 * must be added before this middleware.
 */
const checkToken = async (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): Promise<void> => {
    //we want this to stop requests only to api endpoints
    //and not to express.static for example
    if (req.path.startsWith('/api/') && !(await readToken(req)))
        res.status(401).end();
    else next();
};

export { checkToken };
