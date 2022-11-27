import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mirror from './routers/mirror';
import { exportRouter } from './routers/export';
import api from './routers/api';

const app = express();

//this is here just for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(bodyParser.text({ type: '*/*' }));
app.use('/mirror', mirror);
app.use('/api/export/', exportRouter);
app.use('/api/textgen', api);
app.use(express.static('./public/'));

export { app };
