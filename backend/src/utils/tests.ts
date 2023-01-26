import { pool } from '../db/pool';
import { waitForDatabase } from '../db/util';

const timeout = 60;

jest.setTimeout(timeout * 1000);

beforeAll(async () => {
    await waitForDatabase(pool, timeout);
});

beforeEach(async () => {
    await pool.query('BEGIN');
});

afterEach(async () => {
    await pool.query('ROLLBACK');
});
