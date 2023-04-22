/**
 * This middleware serves the index.html file
 * for get request that are not send to api paths.
 * This middleware should be used after the express.static
 * and before the checkToken middleware.
 */
import { Request, Response } from 'express';

const serveIndex = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    if (req.method === 'GET' && !req.path.startsWith('/api/'))
        res.sendFile('index.html', { root: './public/' });
    else next();
};

export { serveIndex };
