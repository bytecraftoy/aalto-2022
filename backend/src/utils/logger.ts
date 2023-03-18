/**
 * Defines logging and settings associated with it.
 */
import { createLogger, transports, format } from 'winston';
import { isDevelopment, isTesting } from './env';

/**
 * Determines the logging level based on the current environment.
 *  Logging levels are: error, warn, info, http, verbose, debug, silly
 *  Use 'LOG_LEVEL' environment variable to override the default.
 *  In production we only want http (and above) level of logging, but in
 *  development all logs are enabled.
 * @return {string} The logging level to use.
 */
const level = (): string => {
    const env = process.env.LOG_LEVEL;
    if (env) return env;
    if (isDevelopment) return 'debug';
    if (isTesting) return 'warn';
    return 'http';
};

// Use pretty printing only for development environment, otherwise print on one line
const formats = [format.timestamp(), format.json()];
if (isDevelopment) formats.push(format.prettyPrint());

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
