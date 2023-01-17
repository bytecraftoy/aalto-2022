import express from 'express';
import bodyParser from 'body-parser';
import { exportRouter, apiRouter, healthRouter, userRouter } from './routers';
import { cors } from './middleware/cors';
import { requestLogger, errorLogger } from './middleware/logger';

const app = express();
app.use(cors);
app.use(bodyParser.text({ type: '*/*' }));

// Request logger before router
app.use(requestLogger);

app.use('/api/export/', exportRouter);
app.use('/api/textgen', apiRouter);
app.use('/api/health', healthRouter);
app.use('/api/user', userRouter);
app.use(express.static('./public/'));

// Error logger after router
app.use(errorLogger);

export { app };
