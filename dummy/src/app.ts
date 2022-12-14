import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorHandler';
import { textGenRouter } from './routers/textgen';

const app = express();

app.use(cors());
app.use(bodyParser.text({ type: '*/*' }));
app.use('/', textGenRouter);
app.use(errorHandler);

export { app };
