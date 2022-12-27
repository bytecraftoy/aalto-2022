import winston from 'winston';

/**
 * Determines the logging level based on the current environment.
 * @return {string} The logging level to use.
 */
const level = (): string => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'http';
};

/**
 * Creates a Winston logger configured to log to the console and format messages as JSON.
 * The logging level is determined by the 'level' function.
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level(),
        }),
    ],
    format: winston.format.json(),
});

export { logger };
