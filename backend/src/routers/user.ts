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
    projectRequestSchema,
    createUser,
    getProjects,
    getProject,
    createProject,
    saveProject,
    removeProject,
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

userRouter.get(
    '/projects/',
    expressAsyncHandler(async (req, res) => {
        try {
            const payload = await readToken(req);
            if (payload === null) {
                res.status(401).end();
                return;
            }
            const response = await getProjects(payload.userID);
            res.json(response).status(200);
            return;
        } catch (e) {
            logger.error('fetch_all_projects_fail', { error: e });
        }
        res.status(400).end();
    })
);

userRouter.get(
    '/projects/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const payload = await readToken(req);
            if (payload === null) {
                res.status(401).end();
                return;
            }
            const projectID = req.params.id;
            const response = await getProject(payload.userID, projectID);
            if (response.success) {
                res.json(response.data).status(200);
                return;
            }
            res.status(404).end();
            return;
        } catch (e) {
            logger.error('fetch_project_fail', { error: e });
        }
        res.status(400).end();
    })
);

userRouter.post(
    '/projects/new',
    expressAsyncHandler(async (req, res) => {
        try {
            const payload = await readToken(req);
            if (payload === null) {
                res.status(401).end();
                return;
            }
            const info = projectRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            const id = await createProject(
                payload.userID,
                info.name,
                info.json
            );
            res.status(200).send(id);
            return;
        } catch (e) {
            logger.error('new_project_fail', { error: e });
        }
        res.status(400).end();
    })
);

userRouter.put(
    '/projects/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const payload = await readToken(req);
            if (payload === null) {
                res.status(401).end();
                return;
            }
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
                return;
            }
            res.status(404).end();
            return;
        } catch (e) {
            logger.error('save_project_fail', { error: e });
        }
        res.status(400).end();
    })
);

userRouter.delete(
    '/projects/:id',
    expressAsyncHandler(async (req, res) => {
        try {
            const payload = await readToken(req);
            if (payload === null) {
                res.status(401).end();
                return;
            }
            const projectID = req.params.id;
            const response = await removeProject(payload.userID, projectID);
            if (response) {
                res.status(204).end();
                return;
            }
            res.status(404).end();
            return;
        } catch (e) {
            logger.error('delete_project_fail', { error: e });
        }
        res.status(400).end();
    })
);

export { userRouter };
