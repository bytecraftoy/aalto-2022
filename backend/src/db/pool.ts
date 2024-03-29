/**
 * Defines database variables based on environmental variables
 * and creates the pool
 * https://node-postgres.com/features/pooling
 *
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';
import { isTesting } from '../utils/env';

// dotenv may not be properly loaded for tests because the source file it's
// normally called in isn't loaded
if (isTesting) {
    dotenv.config();
}

const databaseConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST ?? 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
};

const pool = new Pool(databaseConfig);

export { pool, databaseConfig };
