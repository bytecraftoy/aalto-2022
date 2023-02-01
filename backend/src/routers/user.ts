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
            const reqInfo = await checkPassword(info.name, info.password);
            if (reqInfo.success) {
                const userID = reqInfo.message;
                const payload: TokenPayload = { userName: info.name, userID };
                const token = await createToken(payload);
                res.cookie(tokenCookieName, token, tokenCookieOptions);
                res.status(204).end();
                return;
            } else {
                res.status(400).send(reqInfo.message);
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
            const created = await createUser(info.name, info.password);
            if (created.success) {
                const userID = created.message;
                const payload: TokenPayload = { userName: info.name, userID };
                const token = await createToken(payload);
                res.cookie(tokenCookieName, token, tokenCookieOptions);
                res.status(204).end();
                logger.info('register_done', { user: info.name });
                return;
            } else {
                res.status(400).send(created.message);
            }
        } catch (e) {
            logger.error('register_fail', { error: e });
        }
        res.status(400).send('Error on saving the user');
    })
);

userRouter.post(
    '/logout/',
    expressAsyncHandler(async (req, res) => {
        if ((await readToken(req)) === null) res.status(401).end();
        else
            res.cookie(tokenCookieName, '-', tokenCookieOptions)
                .status(204)
                .end();
    })
);

userRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const payload = await readToken(req);
        if (payload === null) {
            res.status(401).send('No valid token on the request found');
        } else {
            const response = {
                name: payload.userName,
                id: payload.userID,
            };
            res.json(response);
        }
    })
);

export { userRouter };
