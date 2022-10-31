import express from 'express';
import bodyParser from 'body-parser';
import mirror from './routers/mirror';

const app = express();

app.use(bodyParser.text({ type: '*/*' }));
app.use('/mirror', mirror);
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

export default app;
