import { pool } from './pool';
import { logger } from '../utils/logger';

/**
 *  executeQuery executes the query in the database and returns
 *  either the fetched rows, the changed rows, or the deleted rows
 *  depending on the query.
 *
 * @param {string} text The query to be executed without the input values
 * @param {unknown[]} values The input values seperated from the query
 *                        to mitigate SQL injection
 *
 * @returns {unknown[]} https://node-postgres.com/apis/result. Currently returns result.rows.
 */
export const executeQuery = async (
    text: string,
    values: unknown[]
): Promise<unknown[]> => {
    const query = { text, values };
    logger.debug('db_query_start', { query });

    const client = await pool.connect();

    try {
        const res = await client.query(query);
        client.release();
        logger.debug('db_query_done', { res });
        return res.rows as unknown[];
    } catch (e) {
        client.release();
        logger.error('db_query_fail', { error: e, query });
        throw e;
    }
};

export const selectProjectsbyUserID = async (
    userID: string
): Promise<{ id: string; name: string }[]> => {
    const text = 'SELECT id, name FROM projects WHERE user_id = $1';
    const values = [userID];
    const res = await executeQuery(text, values);
    return res as { id: string; name: string }[];
};

export const selectProjectData = async (
    projectID: string
): Promise<{ data: object }> => {
    const text = 'SELECT data FROM projects WHERE id = $1';
    const values = [projectID];
    const res = await executeQuery(text, values);
    return res[0] as { data: object };
};

export const selectUserSettings = async (
    userID: string
): Promise<{ settings: object }> => {
    const text = 'SELECT settings FROM users WHERE id = $1';
    const values = [userID];
    const res = await executeQuery(text, values);
    return res[0] as { settings: object };
    //return res[0];
};

export const selectUserID = async (name: string): Promise<string | null> => {
    const text = 'SELECT id FROM users WHERE name = $1';
    const values = [name];
    const res = await executeQuery(text, values);
    return res.length ? (res[0] as { id: string }).id : null;
};

export const selectPassword = async (name: string): Promise<string | null> => {
    const text = 'SELECT password_hash FROM users WHERE name = $1';
    const values = [name];
    const res = await executeQuery(text, values);
    return res.length
        ? (res[0] as { password_hash: string }).password_hash
        : null;
};

export const userExists = async (name: string): Promise<boolean> => {
    const text = 'SELECT COUNT(*) from users WHERE name = $1';
    const values = [name];
    const res = await executeQuery(text, values);
    const row = res[0] as { count: string };
    const count = parseInt(row.count);
    return count >= 1;
};

export const addUser = async (name: string, passwordHash: string) => {
    const text = 'INSERT INTO users(name, password_hash) VALUES ($1, $2)';
    const values = [name, passwordHash];
    await executeQuery(text, values);
};

export const deleteUser = async (id: string) => {
    const text = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    await executeQuery(text, values);
};

export const updatePassword = async (id: string, passwordHash: string) => {
    const text = 'UPDATE users SET password_hash = $1 WHERE id = $2';
    const values = [id, passwordHash];
    await executeQuery(text, values);
};

export const updateUserSettings = async (id: string, settings: object) => {
    const text = 'UPDATE users SET settings = $1 WHERE id = $2';
    const values = [id, settings];
    await executeQuery(text, values);
};

export const addProject = async (
    userID: string,
    name: string,
    data: object
) => {
    const text =
        'INSERT INTO projects(user_id, name, data) VALUES ($1, $2, $3)';
    const values = [userID, name, data];
    await executeQuery(text, values);
};

export const deleteProject = async (id: string) => {
    const text = 'DELETE FROM projects WHERE id = $1';
    const values = [id];
    await executeQuery(text, values);
};
