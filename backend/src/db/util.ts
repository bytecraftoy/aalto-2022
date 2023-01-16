import { Pool, Client } from 'pg';
import { logger } from '../utils/logger';

const waitForDatabase = async (db: Pool | Client, timeout_secs = 60) => {
    logger.info('db_startup');

    const start = process.hrtime();

    for (;;) {
        const taken = process.hrtime(start);
        if (taken[0] > timeout_secs) {
            logger.error('db_startup_failed', { taken: taken[0] });
            throw 'db_startup_failed';
        }

        try {
            await db.connect();
        } catch (e) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            logger.warn('db_startup_timeout', { taken: taken[0], error: e });
            continue;
        }

        logger.info('db_startup_done', { taken: taken[0] });
        break;
    }
};

export { waitForDatabase };
