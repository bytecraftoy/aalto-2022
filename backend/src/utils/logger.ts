import { createLogger, transports, format } from 'winston';

/**
 * Determines the logging level based on the current environment.
 * NODE_ENV is a variable used by Express to configure runtime behaviour. In
 * production we only want http (and above) level of logging, but in development
 * all logs are enabled.
 * @return {string} The logging level to use.
 */
const level = (): string => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'http';
};

// Use pretty printing only for development environment, otherwise print on one line
const formats = [format.timestamp(), format.json()];
if (process.env.NODE_ENV === 'development') formats.push(format.prettyPrint());

/**
 * Creates a Winston logger configured to log to the console and format messages as JSON.
 * The logging level is determined by the 'level' function.
 */
const logger = createLogger({
    transports: [
        new transports.Console({
            level: level(),
        }),
    ],
    format: format.combine(...formats),
});

export { logger };
