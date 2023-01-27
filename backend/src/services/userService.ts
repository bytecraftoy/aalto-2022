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
 * Resolves to user id if everything matches and null otherwise.
 * Never rejects.
 */
const checkPassword = async (
    userName: string,
    password: string
): Promise<string | null> => {
    const hash = await selectPassword(userName);
    if (hash === null) return null;
    try {
        if (await bcrypt.compare(password, hash))
            return await selectUserID(userName);
        else return null;
    } catch (e) {
        logger.error(e);
        return null;
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
 * Returns the id of the newly created user
 * if successful and null otherwise.
 */
const createUser = async (
    name: string,
    password: string
): Promise<string | null> => {
    try {
        const exists = await userExists(name);
        if (exists) return null;
        const passwordHash = await bcrypt.hash(password, 10);
        await addUser(name, passwordHash);
        return await selectUserID(name);
    } catch (e) {
        logger.error(e);
        return null;
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
