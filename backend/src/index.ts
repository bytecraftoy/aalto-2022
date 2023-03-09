import http from 'http';
import { getApp } from './app';
import { pool } from './db/pool';
import { waitForDatabase } from './db/util';
import { isTesting } from './utils/env';
import { logger } from './utils/logger';

const getServer = async (): Promise<
    http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
> => {
    const app = await getApp();
    const server = http.createServer(app);
    if (!isTesting) {
        await waitForDatabase(pool, true);
    }
    return server;
};

if (!isTesting) {
    const PORT = process.env.PORT || 3030;

    getServer()
        .then((server) => {
            logger.info('started');
            server.listen(PORT, () => logger.info('started', { port: PORT }));
        })
        .catch((e: unknown) => {
            logger.error('startup_failed', { error: '' + e });
        });
}

export { getServer };
