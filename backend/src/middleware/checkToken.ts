import { Request, Response } from 'express';

/**
 * This middleware prevents anonymous users
 * from accessing sensitive API endpoints.
 * The sensitive endpoints must be added to the app
 * after this middleware.
 * Endpoints that must be available for anonymous users
 * must be added before this middleware.
 */
const checkToken = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    if (req.token === null) res.status(401).end();
    else next();
};

export { checkToken };
