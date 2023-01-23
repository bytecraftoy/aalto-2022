/**
 * A router for handling user logins, logouts, registrations,
 * and all user related information.
 */

import express, { CookieOptions, Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { logger } from './../utils/logger';
import {
    loginRequestSchema,
    checkPassword,
    createToken,
    parseToken,
    registerRequestSchema,
    createUser,
} from './../services/userService';
import { TokenPayload } from '../types/TokenPayload';

const devMode = process.env.NODE_ENV === 'development';

const tokenCookieName = 'user-token';

const tokenCookieOptions: CookieOptions = {
    //the cookie must be unsecure in development
    //since otherwise browser won't send it over unsecure http
    secure: !devMode,
    httpOnly: true,
    sameSite: 'strict',
};

/**
 * Read token payload from a request object.
 * Returns null if the token is not found or is invalid.
 * Never rejects.
 */
const readToken = async (req: Request): Promise<TokenPayload | null> => {
    const token: unknown = req.cookies[tokenCookieName];
    if (typeof token !== 'string') return null;
    try {
        return await parseToken(token);
    } catch (e) {
        logger.error(e);
    }
    return null;
};

const userRouter = express.Router();

userRouter.post(
    '/login/',
    expressAsyncHandler(async (req, res) => {
        try {
            const info = loginRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            if (await checkPassword(info.name, info.password)) {
                const payload: TokenPayload = { userName: info.name };
                const token = await createToken(payload);
                res.cookie(tokenCookieName, token, tokenCookieOptions);
                res.status(204).end();
                return;
            }
        } catch (e) {
            logger.error('login_fail', { error: e });
        }
        res.status(400).end();
    })
);

userRouter.post(
    '/register/',
    expressAsyncHandler(async (req, res) => {
        try {
            const info = registerRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            if (await createUser(info.name, info.password)) {
                const payload: TokenPayload = { userName: info.name };
                const token = await createToken(payload);
                res.cookie(tokenCookieName, token, tokenCookieOptions);
                res.status(204).end();
                logger.info('register_done', { user: info.name });
                return;
            }
        } catch (e) {
            logger.error('register_fail', { error: e });
        }
        res.status(400).end();
    })
);

userRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        //this router is only for testing
        const payload = await readToken(req);
        res.send(JSON.stringify(payload));
    })
);

export { userRouter };
