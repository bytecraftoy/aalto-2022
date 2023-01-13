import { Request, Response } from 'express';

const cors = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    //allow CORS only from localhost because that is required for development
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //the front should be allowed to send any requests in the development mode
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    //cache the CORS information only for 1 minute so changes will take effect quickly
    res.header('Access-Control-Max-Age', '60');
    next();
};

export { cors };
