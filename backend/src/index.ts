import http from 'http';
import { app } from './app';
import { logger } from './utils/logger';

if (process.env.NODE_ENV !== 'test') {
    logger.info('starting');
}

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3030;
    server.listen(PORT, () => logger.info('started', { port: PORT }));
}

export { server };
