import { pool } from './pool';
import { logger } from '../utils/logger';

/**
 *  executeQuery executes the query in the database and returns
 *  either the fetched rows, the changed rows, or the deleted rows
 *  depending on the query.
 *
 * @param {string} text The query to be executed without the input values
 * @param {string} values The input values seperated from the query
 *                        to mitigate SQL injection
 *
 * @returns {string[]} node-postgres.com/apis/result. Currently returns result.rows.
 * If there is a reason to return the full result, it should be a simple change
 */
const executeQuery = async (
    text: string,
    values: string[]
): Promise<string[]> => {
    const query = { text, values };
    await pool.connect();
    const res = await pool.query(query);
    logger.info(res);
    await pool.end();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.rows;
};

export const selectProjectsbyUserID = async (
    userID: string
): Promise<string[]> => {
    const text = 'SELECT Name FROM Projects WHERE UserID = $1';
    const values = [userID];
    const res = await executeQuery(text, values);
    return res;
};

export const selectProjectData = async (projectID: string): Promise<string> => {
    const text = 'SELECT Data FROM Projects WHERE ID = $1';
    const values = [projectID];
    const res = await executeQuery(text, values);
    return res[0];
};

export const selectUserSettings = async (userID: string): Promise<string> => {
    const text = 'SELECT Settings FROM Users WHERE UserID = $1';
    const values = [userID];
    const res = await executeQuery(text, values);
    return res[0];
};

export const addUser = async (name: string, passwordHash: string) => {
    const text =
        'INSERT INTO Users(Name, PasswordHash, Settings) VALUES ($1, $2)';
    const values = [name, passwordHash];
    await executeQuery(text, values);
};

export const deleteUser = async (id: string) => {
    const text = 'DELETE FROM Users WHERE ID = $1';
    const values = [id];
    await executeQuery(text, values);
};

export const updatePassword = async (id: string, passwordHash: string) => {
    const text = 'UPDATE Users SET PasswordHash = $1 WHERE ID = $2';
    const values = [id, passwordHash];
    await executeQuery(text, values);
};

export const updateUserSettings = async (id: string, settings: string) => {
    const text = 'UPDATE Users SET Settings = $1 WHERE ID = $2';
    const values = [id, settings];
    await executeQuery(text, values);
};

export const addProject = async (
    userID: string,
    name: string,
    data: string
) => {
    const text = 'INSERT INTO Projects(UserID, Name, Data) VALUES ($1, $2, $3)';
    const values = [userID, name, data];
    await executeQuery(text, values);
};

export const deleteProject = async (id: string) => {
    const text = 'DELETE FROM Projects WHERE ID = $1';
    const values = [id];
    await executeQuery(text, values);
};
