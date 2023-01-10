import express from 'express';
import bodyParser from 'body-parser';
import { exportRouter, apiRouter, healthRouter } from './routers';
import cors from 'cors';
import { requestLogger, errorLogger } from './middleware/logger';

const app = express();
app.use(cors());
app.use(bodyParser.text({ type: '*/*' }));

// Request logger before router
app.use(requestLogger);

app.use('/api/export/', exportRouter);
app.use('/api/textgen', apiRouter);
app.use('/api/health', healthRouter);
app.use(express.static('./public/'));

// Error logger after router
app.use(errorLogger);

export { app };
