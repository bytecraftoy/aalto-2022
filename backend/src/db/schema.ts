/**
 * Defines the database schema with the node-pg-migrate library
 * Database schema stored in /backend/migrations
 */

import { logger } from '../utils/logger';
import migrate, { RunnerOption } from 'node-pg-migrate';
import { Client } from 'pg';
import { databaseConfig } from './pool';

const runMigrations = async () => {
    logger.info('migrations_start');

    // we need to create a new client instead of using a pool because the
    // migrations lock stays until the client is disconnected - but it would be
    // released back to the pool instead
    const client = new Client(databaseConfig);

    const options: RunnerOption = {
        dbClient: client,
        dir: 'migrations',
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
};

export { runMigrations };
