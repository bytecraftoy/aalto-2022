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
    projectRequestSchema,
    createUser,
    getProjects,
    getProject,
    createProject,
    saveProject,
    removeProject,
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
            const userID = await checkPassword(info.name, info.password);
            if (userID !== null) {
                const payload: TokenPayload = { userName: info.name, userID };
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
            const userID = await createUser(info.name, info.password);
            if (userID !== null) {
                const payload: TokenPayload = { userName: info.name, userID };
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
            res.status(401).end();
        } else {
            const response = {
                name: payload.userName,
                id: payload.userID,
            };
            res.json(response);
        }
    })
);

userRouter.get(
    '/projects/',
    expressAsyncHandler(async (req, res) => {
        const payload = await readToken(req);
        if (payload === null) res.status(401).end();
        else {
            const response = getProjects(payload.userID);
            res.json(response).status(200);
        }
    })
);

//response[0] == true if project exists
userRouter.get(
    '/projects/:id',
    expressAsyncHandler(async (req, res) => {
        const payload = await readToken(req);
        if (payload === null) res.status(401).end();
        else {
            const projectID = req.params.id;
            const response = await getProject(payload.userID, projectID);
            if (response[0]) {
                res.json(response[1]).status(200);
            } else {
                res.status(404).end();
            }
        }
    })
);

userRouter.post(
    '/projects/new',
    expressAsyncHandler(async (req, res) => {
        const payload = await readToken(req);
        if (payload === null) res.status(401).end();
        else {
            const info = projectRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            const id = await createProject(
                payload.userID,
                info.name,
                info.json
            );
            res.send(id).status(200);
        }
    })
);

userRouter.put(
    '/projects/:id',
    expressAsyncHandler(async (req, res) => {
        const payload = await readToken(req);
        if (payload === null) res.status(401).end();
        else {
            const info = projectRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            const projectID = req.params.id;
            const response = await saveProject(
                payload.userID,
                projectID,
                info.name,
                info.json
            );
            if (response) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        }
    })
);

userRouter.delete(
    '/projects/:id',
    expressAsyncHandler(async (req, res) => {
        const payload = await readToken(req);
        if (payload === null) res.status(401).end();
        else {
            const projectID = req.params.id;
            const response = await removeProject(payload.userID, projectID);
            if (response) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        }
    })
);

export { userRouter };
