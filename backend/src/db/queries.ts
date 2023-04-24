/**
 * Defines the SQL queries and the means to execute the queries
 * with the executeQuery function.
 * All query functions are collected in this file.
 */

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
const executeQuery = async (
    text: string,
    values: unknown[]
): Promise<unknown[]> => {
    const query = { text, values };
    logger.debug('db_query_start', { query });

    const client = await pool.connect();

    try {
        const res = await client.query(query);
        client.release();
        const result = res.rows;
        logger.debug('db_query_done', { result });
        return result as unknown[];
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

export const selectProject = async (
    projectID: string
): Promise<{ name: string; data: object }> => {
    const text = 'SELECT name, data FROM projects WHERE id = $1';
    const values = [projectID];
    const res = await executeQuery(text, values);
    return res[0] as { name: string; data: object };
};

export const selectProjectOwner = async (
    projectID: string
): Promise<{ user_id: string }> => {
    const text = 'SELECT user_id FROM projects WHERE id = $1';
    const values = [projectID];
    const res = await executeQuery(text, values);
    return res[0] as { user_id: string };
};

/**
 * This function returns the settings of a user.
 * Throws an error if the user does not exist.
 *
 * @returns {object | null} settings if exists, null otherwise
 */
export const selectUserSettings = async (
    userID: string
): Promise<object | null> => {
    const text = 'SELECT settings FROM users WHERE id = $1';
    const values = [userID];
    const res = (await executeQuery(text, values)) as {
        settings: object | null;
    }[];
    const settings = res[0].settings;
    // cast undefined to null
    return settings ?? null;
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

type UserRole = 'normal' | 'admin';
export const selectUserRole = async (id: string): Promise<UserRole | null> => {
    const text = 'SELECT role from users WHERE id = $1';
    const values = [id];
    const res = await executeQuery(text, values);
    return res.length ? (res[0] as { role: UserRole }).role : null;
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

export const updatePassword = async (name: string, passwordHash: string) => {
    const text = 'UPDATE users SET password_hash = $1 WHERE name = $2';
    const values = [passwordHash, name];
    await executeQuery(text, values);
};

export const updateUserSettings = async (id: string, settings: object) => {
    const text = 'UPDATE users SET settings = $1 WHERE id = $2';
    const values = [settings, id];
    await executeQuery(text, values);
};

export const addProject = async (
    userID: string,
    name: string,
    data: object
): Promise<{ id: string }> => {
    const text =
        'INSERT INTO projects(user_id, name, data) VALUES ($1, $2, $3) RETURNING id';
    const values = [userID, name, data];
    const res = await executeQuery(text, values);
    return res[0] as { id: string };
};

export const updateProject = async (name: string, data: object, id: string) => {
    const text = 'UPDATE projects SET name = $1, data = $2 WHERE id = $3';
    const values = [name, data, id];
    await executeQuery(text, values);
};

export const deleteProject = async (id: string) => {
    const text = 'DELETE FROM projects WHERE id = $1';
    const values = [id];
    await executeQuery(text, values);
};
