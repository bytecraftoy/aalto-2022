import express from 'express';
import {jsonValidation, sendToDummy} from '../services/dummyService';

const router = express.Router();

router.post('/', async (req, res) => {

    if (jsonValidation(req.body)) {
        const response = await sendToDummy(req.body);
        res.send(response);
    } else {
        res.status(400).json({ error: 'bad request' });
    }
});

router.get('/*', (req, res) => {
    res.send(req.path);
});

export default router;
