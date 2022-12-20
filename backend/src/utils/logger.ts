import winston from 'winston';

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'http';
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level(),
        }),
    ],
    format: winston.format.json(),
});

export { logger };
