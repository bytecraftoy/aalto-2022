import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mirror from './routers/mirror';

const app = express();

app.use(cors());
app.use(bodyParser.text({ type: '*/*' }));
app.use('/mirror', mirror);
app.use(express.static('./public/'));

/*
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});
*/
export { app };
