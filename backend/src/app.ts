import express from 'express';
import bodyParser from 'body-parser';
import {
    exportRouter,
    apiRouter,
    healthRouter,
    userRouter,
    presetsRouter,
    getAdminRouter,
    statusRouter,
} from './routers';
import { cors } from './middleware/cors';
import { requestLogger, errorLogger } from './middleware/logger';
import cookieParser from 'cookie-parser';
import { checkToken } from './middleware/checkToken';
import expressAsyncHandler from 'express-async-handler';
import { tokenReader } from './middleware/tokenReader';
import { rootPath } from './routers/admin';
import { isTesting } from './utils/env';
import { waitForDatabase } from './db/util';
import { pool } from './db/pool';

const app = express();

const getApp = async (): Promise<express.Express> => {
    if (!isTesting) {
        await waitForDatabase(pool, true);
        const adminRouter = await getAdminRouter();
        app.use(rootPath, adminRouter);
    }

    app.use(cors);
    app.use(cookieParser());
    app.use(bodyParser.text({ type: '*/*' }));
    app.use(expressAsyncHandler(tokenReader));

    // Request logger before router
    app.use(requestLogger);

    app.use('/api/health', healthRouter);
    app.use('/api/status', statusRouter);
    app.use('/api/user', userRouter);
    app.use(express.static('./public/'));
    app.use(checkToken);
    app.use('/api/export/', exportRouter);
    app.use('/api/textgen', apiRouter);
    app.use('/api/presets', presetsRouter);

    // Error logger after router
    app.use(errorLogger);

    return app;
};

export { getApp };
