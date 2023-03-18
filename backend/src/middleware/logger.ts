/**
 * File contains functions related to logging errors and http requests
 * the logging level can be adjusted with LOG_LEVEL environmental variable
 */
import { logger } from '../utils/logger';
import { Request, Response } from 'express';

/**
 * Middleware function for logging incoming HTTP requests and responses to the Winston logger.
 */
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

/**
 * Middleware function for logging errors to the Winston logger and passing the error to the next middleware.
 */
function errorLogger(
    err: unknown,
    _req: Request,
    _res: Response,
    next: (param?: unknown) => void
): void {
    logger.error('exception', { err });
    next(err);
}

export { requestLogger, errorLogger };
