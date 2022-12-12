import express from 'express';
import bodyParser from 'body-parser';
import { mirrorRouter, exportRouter, apiRouter, healthRouter } from './routers';
import cors from 'cors';

const app = express();

//this is here just for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(bodyParser.text({ type: '*/*' }));
app.use('/api/mirror', mirrorRouter);
app.use('/api/export/', exportRouter);
app.use('/api/textgen', apiRouter);
app.use('/health', healthRouter);
app.use(express.static('./public/'));

export { app };
