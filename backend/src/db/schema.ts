import { logger } from '../utils/logger';
import migrate, { RunnerOption } from 'node-pg-migrate';
import { Client } from 'pg';
import { databaseConfig } from './pool';

const runMigrations = async () => {
    logger.info('migrations_start');
    const client = new Client(databaseConfig());

    const options: RunnerOption = {
        direction: 'up',
        dir: 'migrations',
        migrationsTable: 'pgmigrations',
        dbClient: client,
    };

    await client.connect();

    const res = await migrate(options);
    logger.info('migrations_done', { res });
};

export { runMigrations };
