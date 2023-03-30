/**
 * This middleware prevents anonymous users
 * from accessing sensitive API endpoints.
 * The sensitive endpoints must be added to the app
 * after this middleware.
 * Endpoints that must be available for anonymous users
 * must be added before this middleware.
 */
import { Request, Response } from 'express';

const checkToken = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    if (req.token === null)
        res.status(401).send('No valid token on the request found');
    else next();
};

export { checkToken };
