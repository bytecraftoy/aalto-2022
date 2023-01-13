import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {logger} from './../utils/logger';

/**
 * The secret used for signing the web tokens.
 * If we want the secret to remain same over runtimes
 * (meaning that the te tokens from previous runtime will still be valid)
 * the JWT_SECRET environment variable should be defined.
 * The secret must be cryptographically high quality random string.
 * If an attacker can guess the secret they can sign their own tokens.
 */
const secret = process.env.JWT_SECRET || crypto.randomBytes(32).toString('base64');

/**
 * The lifetime for a token.
 */
const tokenLifetime = Number.parseInt(process.env.JWT_LIFETIME as string) || 14400; //4 hours

/**
 * Throws an error if anything is wrong.
 */
const parseLoginInfo = (body: string): {name: string, password: string} => {
    const {name, password} = JSON.parse(body) as {name: string, password: string};
    if(typeof name !== 'string')
        throw new TypeError('Name should be a string');
    if(typeof password !== 'string')
        throw new TypeError('Password should be a string');
    return {name, password};
};

/**
 * Resolves to null if there is no matching user in the database.
 */
const getPasswordHash = async (userName: string): Promise<string | null> => {
    //TODO: real implementation
    await new Promise(r => setTimeout(r, 1));
    if(userName === 'nonexistent')
        return null;
    return '$2b$10$Jmn4NFCMntrUCRJXDFVmtuZJNBwpjGY1sXwgSQwL6icD72nHUaGeq'; //password1234
};

/**
 * Checks if the user exists and the password is correct.
 * Resolves to true if everything matches.
 * Never rejects.
 */
const checkPassword = async (userName: string, password: string): Promise<boolean> => {
    const hash = await getPasswordHash(userName);
    if(hash === null) return false;
    try{
        return await bcrypt.compare(password, hash);
    }catch(e){
        logger.error(e);
        return false;
    }
};

/**
 * Creates a JWT.
 * Can reject.
 */
const createToken = (userName: string): Promise<string> => {
    return new Promise((resolve, reject) =>
        jwt.sign({userName}, secret, {expiresIn: tokenLifetime}, (err, token) => 
            //the token should be a string if err is undefined
            err ? reject(err) : resolve(token as string)
        )
    );
};

export {
    parseLoginInfo,
    checkPassword,
    createToken
};