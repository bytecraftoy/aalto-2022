/**
 * A router for handling user logins, logouts, registrations,
 * and all user related information.
 */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { logger } from './../utils/logger';
import {
    loginRequestSchema,
    checkPassword,
    createToken,
    registerRequestSchema,
    createUser,
} from './../services/userService';
import { TokenPayload } from '../types/TokenPayload';
import {
    tokenCookieName,
    tokenCookieOptions,
    readToken,
} from './../services/tokenService';

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
                res.status(200).json(payload);
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
                res.status(200).json(payload);
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

userRouter.post('/logout/', (req, res) =>
    res.cookie(tokenCookieName, '-', tokenCookieOptions).status(204).end()
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
