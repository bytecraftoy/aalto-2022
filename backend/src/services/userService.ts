import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from './../utils/logger';
import { TokenPayload } from '../types/TokenPayload';
import { z } from 'zod';
import { addUser, userExists } from '../db/queries';

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
 * Resolves to null if there is no matching user in the database.
 */
const getPasswordHash = async (userName: string): Promise<string | null> => {
    //TODO: real implementation
    await new Promise((r) => setTimeout(r, 1));
    if (userName === 'nonexistent') return null;
    return '$2b$10$Jmn4NFCMntrUCRJXDFVmtuZJNBwpjGY1sXwgSQwL6icD72nHUaGeq'; //password1234
};

/**
 * Checks if the user exists and the password is correct.
 * Resolves to true if everything matches.
 * Never rejects.
 */
const checkPassword = async (
    userName: string,
    password: string
): Promise<boolean> => {
    const hash = await getPasswordHash(userName);
    if (hash === null) return false;
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        logger.error(e);
        return false;
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

const createUser = async (name: string, password: string): Promise<boolean> => {
    const exists = await userExists(name);
    if (exists) {
        return false;
    }

    await addUser(name, password);

    return true;
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
