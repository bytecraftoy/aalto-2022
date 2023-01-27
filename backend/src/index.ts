import http from 'http';
import { app } from './app';
import { pool } from './db/pool';
import { waitForDatabase } from './db/util';
import { logger } from './utils/logger';

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3030;

    waitForDatabase(pool)
        .then(() => {
            logger.info('starting');
            server.listen(PORT, () => logger.info('started', { port: PORT }));
        })
        .catch((e: unknown) => {
            logger.error('startup_failed', { error: '' + e });
        });
}

export { server };
