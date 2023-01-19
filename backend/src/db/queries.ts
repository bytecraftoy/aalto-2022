import { pool } from './pool';
import { logger } from '../utils/logger';

const executeQuery = async (text: string, values: string[]) => {
    const query = {
        text: text,
        values: values,
    };
    await pool.connect();
    pool.query(query, (err, res) => {
        if (err) throw err;
        logger.info(res);
    });
    await pool.end();
};

const addUser = async (name: string, passwordHash: string) => {
    const text =
        'INSERT INTO Users(Name, PasswordHash, Settings) VALUES ($1, $2)';
    const values = [name, passwordHash];
    await executeQuery(text, values);
};

const deleteUser = async (id: string) => {
    const text = 'DELETE FROM Users WHERE ID = $1';
    const values = [id];
    await executeQuery(text, values);
};

const updatePassword = async (id: string, passwordHash: string) => {
    const text = 'UPDATE Users SET PasswordHash = $1 WHERE ID = $2';
    const values = [id, passwordHash];
    await executeQuery(text, values);
};

const updateUserSettings = async (id: string, settings: string) => {
    const text = 'UPDATE Users SET Settings = $1 WHERE ID = $2';
    const values = [id, settings];
    await executeQuery(text, values);
};

const addProject = async (userID: string, name: string, data: string) => {
    const text = 'INSERT INTO Projects(UserID, Name, Data) VALUES ($1, $2, $3)';
    const values = [userID, name, data];
    await executeQuery(text, values);
};

const deleteProject = async (id: string) => {
    const text = 'DELETE FROM Projects WHERE ID = $1';
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
};
