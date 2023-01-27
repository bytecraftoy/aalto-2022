import { Pool } from 'pg';
import { logger } from '../utils/logger';
import { runMigrations } from './schema';

const waitForDatabase = async (db: Pool, timeout_secs = 60) => {
    logger.info('db_startup');

    const start = process.hrtime();

    for (;;) {
        const taken = process.hrtime(start);
        if (taken[0] > timeout_secs) {
            logger.error('db_startup_failed', { taken: taken[0] });
            throw 'db_startup_failed';
        }

        try {
            const client = await db.connect();
            client.release();
        } catch (e) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            logger.warn('db_startup_timeout', { taken: taken[0], error: e });
            continue;
        }

        logger.info('db_startup_done', { taken: taken[0] });
        break;
    }

    await runMigrations();
};

export { waitForDatabase };
