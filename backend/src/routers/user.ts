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
    updateSettingsRequestSchema,
    getProjects,
    getProject,
    createProject,
    saveProject,
    removeProject,
    passwordRequestSchema,
    changePassword,
} from './../services/userService';
import { TokenPayload } from '../types/TokenPayload';
import {
    tokenCookieName,
    tokenCookieOptions,
} from './../services/tokenService';
import { selectUserSettings, updateUserSettings } from '../db/queries';
import { isValidRegisterKey } from '../services/registerKeyService';
import { checkToken } from '../middleware/checkToken';

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
            const body = registerRequestSchema.safeParse(
                JSON.parse(req.body as string)
            );
            if (!body.success) {
                logger.error('register_validation_fail', { error: body.error });
                res.status(400).send(
                    body.error.issues.map((e) => e.message).join(', ')
                );
                return;
            }
            const info = body.data;

            const valid = await isValidRegisterKey(info.key);
            if (!valid) {
                res.status(401).send('Invalid key');
                return;
            }

            const created = await createUser(info.name, info.password);
            if (!created.success) {
                res.status(400).send(created.message);
                return;
            }

            const userID = created.message;
            const payload: TokenPayload = { userName: info.name, userID };
            const token = await createToken(payload);
            res.cookie(tokenCookieName, token, tokenCookieOptions);
            res.status(200).json(payload);
            logger.info('register_done', { user: info.name });
        } catch (e) {
            logger.error('register_fail', { error: e });
            res.status(400).send('Error on saving the user');
        }
    })
);

userRouter.post('/logout/', (req, res) =>
    res.cookie(tokenCookieName, '-', tokenCookieOptions).status(204).end()
);

userRouter.get('/', checkToken, (req, res) => {
    const response = {
        name: (req.token as TokenPayload).userName,
        id: (req.token as TokenPayload).userID,
    };
    res.json(response);
});

userRouter.get(
    '/projects/',
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const response = await getProjects(
                (req.token as TokenPayload).userID
            );
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
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const projectID = req.params.id;
            const response = await getProject(
                (req.token as TokenPayload).userID,
                projectID
            );
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
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const info = projectRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            const id = await createProject(
                (req.token as TokenPayload).userID,
                info.name,
                info.data
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
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const info = projectRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            const projectID = req.params.id;
            const response = await saveProject(
                (req.token as TokenPayload).userID,
                projectID,
                info.name,
                info.data
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
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const projectID = req.params.id;
            const response = await removeProject(
                (req.token as TokenPayload).userID,
                projectID
            );
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

userRouter.get(
    '/settings/',
    checkToken,
    expressAsyncHandler(async (req, res) => {
        const data = await selectUserSettings(
            (req.token as TokenPayload).userID
        );
        if (data === null) {
            logger.warn('get_user_settings_missing', { payload: req.token });
            res.status(404).send('No settings found');
        } else {
            const json = JSON.stringify(data);
            res.status(200).send(json);
        }
    })
);

userRouter.put(
    '/settings/',
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const body_json = JSON.parse(req.body as string) as unknown;
            // we do not know what the data contains, use passthrough
            const data = updateSettingsRequestSchema
                .passthrough()
                .parse(body_json);

            await updateUserSettings((req.token as TokenPayload).userID, data);
            res.status(204).end();
        } catch (e) {
            logger.error('update_user_settings_fail', {
                payload: req.token,
                error: e,
            });
            res.status(400).send('Malformed body');
        }
    })
);

userRouter.put(
    '/password/',
    checkToken,
    expressAsyncHandler(async (req, res) => {
        try {
            const info = passwordRequestSchema.parse(
                JSON.parse(req.body as string)
            );
            const reqInfo = await changePassword(
                (req.token as TokenPayload).userName,
                info.currentPassword,
                info.newPassword
            );
            if (reqInfo.success) {
                res.status(204).end();
                return;
            } else {
                res.status(400).send(reqInfo.message);
            }
        } catch (e) {
            logger.error('update_user_password_fail', {
                payload: req.token,
                error: e,
            });
            res.status(400).send('Malformed body');
        }
    })
);

export { userRouter };
