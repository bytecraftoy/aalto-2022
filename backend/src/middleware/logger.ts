import { logger } from '../utils/logger';
import { Request, Response } from 'express';

const requestLogger = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    const body = req.body as string;

    const method = req.method;
    const url = req.url;
    const headers = req.headers;
    const httpVersion = req.httpVersion;

    logger.http({
        message: 'request',
        method,
        httpVersion,
        url,
        headers,
        body,
    });

    res.on('finish', () => {
        logger.http({
            message: 'response',
            method,
            url,
            status: res.statusCode,
        });
    });

    next();
};

function errorLogger(
    err: unknown,
    req: Request,
    res: Response,
    next: (param?: unknown) => void
) {
    logger.error({ message: 'exception', err });
    next(err);
}

export { requestLogger, errorLogger };
