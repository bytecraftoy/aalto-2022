import express from 'express';
import bodyParser from 'body-parser';
import { exportRouter, apiRouter, healthRouter, userRouter } from './routers';
import { cors } from './middleware/cors';
import { requestLogger, errorLogger } from './middleware/logger';
import cookieParser from 'cookie-parser';
import { checkToken } from './middleware/checkToken';
import expressAsyncHandler from 'express-async-handler';
import { tokenReader } from './middleware/tokenReader';
import { isProduction } from './utils/env';

const app = express();
app.use(cors);
app.use(cookieParser());
app.use(bodyParser.text({ type: '*/*' }));
app.use(expressAsyncHandler(tokenReader));

// Request logger before router
app.use(requestLogger);

app.use('/api/health', healthRouter);
app.use('/api/user', userRouter);
// Static files are served by NGINX in production
if (!isProduction()) {
    app.use(express.static('./public/'));
}
app.use(checkToken);
app.use('/api/export/', exportRouter);
app.use('/api/textgen', apiRouter);

// Error logger after router
app.use(errorLogger);

export { app };
