import { pool } from '../db/pool';
import { runMigrations } from '../db/schema';
import { resetDatabase, waitForDatabase } from '../db/util';

const timeout = 60;

jest.setTimeout(timeout * 1000);

beforeAll(async () => {
    await waitForDatabase(pool, false, timeout);
});

beforeEach(async () => {
    await resetDatabase(pool);
    await runMigrations();
});
