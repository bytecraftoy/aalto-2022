import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from './../utils/logger';
import { TokenPayload } from '../types/TokenPayload';
import { z } from 'zod';
import {
    addUser,
    userExists,
    selectUserID,
    selectPassword,
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

type LoginRequest = z.infer<typeof loginRequestSchema>;

const registerRequestSchema = z.object({
    name: z.string(),
    password: z
        .string()
        .min(6, 'Password should be at least 6 characters')
        .max(49, 'Password can be 49 characters maximum'),
});

type RegisterRequest = z.infer<typeof loginRequestSchema>;

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

export {
    loginRequestSchema,
    LoginRequest,
    registerRequestSchema,
    RegisterRequest,
    checkPassword,
    createUser,
    createToken,
    parseToken,
};
