import { Pool } from 'pg';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
    dotenv.config();
}

const databaseConfig = {
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
};

const pool = new Pool(databaseConfig);

export { pool, databaseConfig };
