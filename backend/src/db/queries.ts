import { pool } from './pool';
import { logger } from '../utils/logger';

const executeQuery = async (text: string, values: string[]) => {
    const query = {
        text: text,
        values: values,
    };
    logger.debug('db_query_start', { query });
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        client.release();
        logger.debug('db_query_done', { res });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return res.rows;
    } catch (e) {
        client.release();
        logger.error('db_query_fail', { error: e, query });
    }
};

const selectProjectsbyUserID = async (userID: string) => {
    const text = 'SELECT name FROM projects WHERE user_id = $1';
    const values = [userID];
    const res = await executeQuery(text, values);
    return res;
};

const selectProjectData = async (projectID: string) => {
    const text = 'SELECT data FROM projects WHERE ID = $1';
    const values = [projectID];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await executeQuery(text, values);
    //return res[0];
};

const selectUserSettings = async (userID: string) => {
    const text = 'SELECT settings FROM users WHERE user_id = $1';
    const values = [userID];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await executeQuery(text, values);
    //return res[0];
};

const addUser = async (name: string, passwordHash: string) => {
    const text = 'INSERT INTO users(name, password_hash) VALUES ($1, $2)';
    const values = [name, passwordHash];
    await executeQuery(text, values);
};

const deleteUser = async (id: string) => {
    const text = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    await executeQuery(text, values);
};

const updatePassword = async (id: string, passwordHash: string) => {
    const text = 'UPDATE users SET password_hash = $1 WHERE id = $2';
    const values = [id, passwordHash];
    await executeQuery(text, values);
};

const updateUserSettings = async (id: string, settings: string) => {
    const text = 'UPDATE users SET settings = $1 WHERE id = $2';
    const values = [id, settings];
    await executeQuery(text, values);
};

const addProject = async (userID: string, name: string, data: string) => {
    const text =
        'INSERT INTO projects(user_id, name, data) VALUES ($1, $2, $3)';
    const values = [userID, name, data];
    await executeQuery(text, values);
};

const updateProject = async (id: string, data: string) => {
    const text = 'UPDATE projects SET data = $2 WHERE id = $1';
    const values = [id, data];
    await executeQuery(text, values);
};

const deleteProject = async (id: string) => {
    const text = 'DELETE FROM projects WHERE id = $1';
    const values = [id];
    await executeQuery(text, values);
};

export {
    addUser,
    deleteUser,
    updatePassword,
    updateUserSettings,
    addProject,
    deleteProject,
    updateProject,
    selectProjectData,
    selectUserSettings,
    selectProjectsbyUserID,
};
