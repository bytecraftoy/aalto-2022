import http from 'http';
import { app } from './app';
import { pool } from './db/pool';
import { waitForDatabase } from './db/util';
import { isTesting } from './utils/env';
import { logger } from './utils/logger';

const server = http.createServer(app);

if (!isTesting()) {
    const PORT = process.env.PORT || 3030;

    waitForDatabase(pool, true)
        .then(() => {
            logger.info('starting');
            server.listen(PORT, () => logger.info('started', { port: PORT }));
        })
        .catch((e: unknown) => {
            logger.error('startup_failed', { error: '' + e });
        });
}

export { server };
