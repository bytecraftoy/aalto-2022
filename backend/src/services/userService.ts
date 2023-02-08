import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from './../utils/logger';
import { TokenPayload } from '../types/TokenPayload';
import { z } from 'zod';
import {
    addUser,
    userExists,
    selectProjectsbyUserID,
    selectProjectData,
    selectUserID,
    selectPassword,
    selectProjectOwner,
    addProject,
    updateProject,
    deleteProject,
} from '../db/queries';
import { RequestInfo, DEFAULT_ERROR } from '../types/ServiceTypes';

/**
 * The secret used for signing the web tokens.
 * The secret must be a cryptographically high quality random string.
 * If an attacker can guess the secret they can sign their own tokens.
 */
const secret = process.env.JWT_SECRET;
if (!secret) {
    const message = 'JWT_SECRET environment variable is not defined';
    logger.error(message);
    throw new Error(message);
}

/**
 * The lifetime for a token.
 */
const tokenLifetime =
    Number.parseInt(process.env.JWT_LIFETIME as string) || 14400; //4 hours

const loginRequestSchema = z.object({
    name: z.string(),
    password: z.string(),
});

const registerRequestSchema = z.object({
    name: z
        .string()
        .min(1, 'Username should not be empty')
        .max(50, 'Username can be at most 50 characters'),
    password: z
        .string()
        .min(6, 'Password should be at least 6 characters')
        .max(50, 'Password can be 50 characters maximum'),
    key: z
        .string({ required_error: 'Register key required' })
        .min(1, 'Register key may not be empty'),
});

const updateSettingsRequestSchema = z.object({});

const projectRequestSchema = z.object({
    name: z.string(),
    json: z.string(),
});

/**
 * Checks if the user exists and the password is correct.
 * Returns the RequestInfo
 * When method fails gives: { success: false, message: error message}
 * otherwize returns: { success: true, message: userID }
 */
const checkPassword = async (
    userName: string,
    password: string
): Promise<RequestInfo> => {
    const hash = await selectPassword(userName);
    if (hash === null) return DEFAULT_ERROR;
    try {
        if (await bcrypt.compare(password, hash)) {
            const userID = await selectUserID(userName);
            if (!userID) return DEFAULT_ERROR;
            return { success: true, message: userID };
        } else {
            return {
                success: false,
                message: 'Incorrect username or password. Please try again.',
            };
        }
    } catch (e) {
        logger.error(e);
        return DEFAULT_ERROR;
    }
};

/**
 * Creates a JWT.
 * Can reject.
 */
const createToken = (payload: TokenPayload): Promise<string> => {
    return new Promise((resolve, reject) =>
        jwt.sign(payload, secret, { expiresIn: tokenLifetime }, (err, token) =>
            //the token should be a string if err is undefined
            err ? reject(err) : resolve(token as string)
        )
    );
};

/**
 * Validates and parses the token.
 * Rejects if something is wrong.
 */
const parseToken = (token: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) =>
        jwt.verify(token, secret, (err, payload) =>
            err ? reject(err) : resolve(payload as TokenPayload)
        )
    );
};

/**
 * Creates a new user.
 * If function fails it returns { success: false, message: error message }
 * otherwize returns { success: true, message: userID }
 */
const createUser = async (
    name: string,
    password: string
): Promise<RequestInfo> => {
    try {
        const exists = await userExists(name);
        if (exists)
            return {
                success: false,
                message:
                    'Username already exists, please choose a different one.',
            };
        const passwordHash = await bcrypt.hash(password, 10);
        await addUser(name, passwordHash);
        const userId = await selectUserID(name);
        if (!userId) return DEFAULT_ERROR;
        return { success: true, message: userId };
    } catch (e) {
        logger.error(e);
        return DEFAULT_ERROR;
    }
};

/**
 * Fetches and returns list of projects by user id.
 * returns null on failure
 */
const getProjects = async (
    id: string
): Promise<{ id: string; name: string }[] | null> => {
    try {
        const projects = await selectProjectsbyUserID(id);
        return projects;
    } catch (e) {
        logger.error(e);
        return null;
    }
};

/**
 * Fetches data of a specific project
 * along with a boolean value, which is
 * true if successful or false
 * if project does not exist or user id
 * does not match or on failure
 */
const getProject = async (
    userID: string,
    projectID: string
): Promise<{ success: boolean; data: object }> => {
    try {
        const ownerID = await selectProjectOwner(projectID);
        const isOwner = ownerID.user_id === userID;
        if (isOwner) {
            const response = await selectProjectData(projectID);

            return { success: true, data: response };
        }

        return { success: false, data: {} };
    } catch (e) {
        logger.error(e);
        return { success: false, data: { e: 'error' } };
    }
};

/**
 * creates new projects and returns
 * the projects id if successful
 * null otherwise
 */
const createProject = async (
    userID: string,
    projectName: string,
    data: string
): Promise<string | null> => {
    try {
        const obj = JSON.parse(data) as object;
        const project = await addProject(userID, projectName, obj);
        return project.id;
    } catch (e) {
        logger.error(e);
        return null;
    }
};

/**
 * Updates name and data of project and returns
 * true if successful, false otherwise
 */
const saveProject = async (
    userID: string,
    projectID: string,
    projectName: string,
    data: string
): Promise<boolean> => {
    try {
        const ownerID = await selectProjectOwner(projectID);
        const isOwner = ownerID.user_id === userID;
        if (isOwner) {
            const obj = JSON.parse(data) as object;
            await updateProject(projectName, obj, projectID);
            return true;
        }
        return false;
    } catch (e) {
        logger.error(e);
        return false;
    }
};

/**
 * deletes project from database,
 * returns true if successful
 * false otherwise
 */
const removeProject = async (
    userID: string,
    projectID: string
): Promise<boolean> => {
    try {
        const ownerID = await selectProjectOwner(projectID);
        const isOwner = ownerID.user_id === userID;
        if (isOwner) {
            await deleteProject(projectID);
            return true;
        }
        return false;
    } catch (e) {
        logger.error(e);
        return false;
    }
};

export {
    loginRequestSchema,
    registerRequestSchema,
    updateSettingsRequestSchema,
    projectRequestSchema,
    checkPassword,
    createUser,
    createToken,
    parseToken,
    getProjects,
    getProject,
    createProject,
    saveProject,
    removeProject,
};
