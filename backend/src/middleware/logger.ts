import { logger } from '../utils/logger';
import { Request, Response } from 'express';

const requestLogger = (
    req: Request,
    res: Response,
    next: (param?: unknown) => void
): void => {
    const body = req.body;

    const method = req.method;
    const url = req.url;

    logger.info({ message: 'Request', method, url, body });

    res.on('finish', () => {
        logger.info({
            message: 'Response',
            method,
            url,
            status: res.statusCode,
            res.body,
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
    logger.error({ message: 'Exception', err });
    next(err);
}

export { requestLogger, errorLogger };
