/**
 * file for defining CORS (Cross-origin-resource sharing)
 */
import { Request, Response } from 'express';

const cors = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    //allow CORS only from localhost because that is required for development
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // allow cookies
    res.header('Access-Control-Allow-Credentials', 'true');
    //the front should be allowed to send any requests in the development mode
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //cache the CORS information only for 1 minute so changes will take effect quickly
    res.header('Access-Control-Max-Age', '60');
    next();
};

export { cors };
