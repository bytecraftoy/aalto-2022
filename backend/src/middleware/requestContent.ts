import winston from 'winston';

declare global {
    declare namespace Express {
        export interface Request {
            logger: winston.Logger;
        }
    }
}
