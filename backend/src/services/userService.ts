import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from './../utils/logger';
import { TokenPayload } from '../types/TokenPayload';

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

/**
 * Throws an error if anything is wrong.
 */
const parseLoginRequestBody = (
    body: string
): { name: string; password: string } => {
    const { name, password } = JSON.parse(body) as {
        name: string;
        password: string;
    };
    if (typeof name !== 'string')
        throw new TypeError('Name should be a string');
    if (typeof password !== 'string')
        throw new TypeError('Password should be a string');
    return { name, password };
};

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

export { parseLoginRequestBody, checkPassword, createToken, parseToken };
