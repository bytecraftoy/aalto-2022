/**
 * Defines the database schema with the node-pg-migrate library
 * Database schema stored in /backend/migrations
 */

import { logger } from '../utils/logger';
import migrate, { RunnerOption } from 'node-pg-migrate';
import { Client } from 'pg';
import { databaseConfig } from './pool';
import { RunMigration } from 'node-pg-migrate/dist/migration';
import { isProduction } from '../utils/env';

const migrateFolder = async (folder: string): Promise<RunMigration[]> => {
    logger.info('migrations_start');

    // we need to create a new client instead of using a pool because the
    // migrations lock stays until the client is disconnected - but it would be
    // released back to the pool instead
    const client = new Client(databaseConfig);

    const options: RunnerOption = {
        dbClient: client,
        dir: folder,
        direction: 'up',
        log: (msg: string) => {
            logger.info('migrate', { msg });
        },
        migrationsTable: 'pgmigrations',
    };

    await client.connect();
    const res = await migrate(options);
    await client.end();

    logger.info('migrations_done', { res });
    return res;
};

const runMigrations = async () => {
    logger.info('migrations_start');
    const res = await migrateFolder('migrations');
    logger.info('migrations_done', { res });

    if (!isProduction) {
        logger.info('dev_migrations_start');
        const dev_res = await migrateFolder('dev_migrations');
        logger.info('dev_migrations_done', { dev_res });
    }
};

export { runMigrations };
