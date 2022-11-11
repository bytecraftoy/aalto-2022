import express from 'express';
import {jsonValidation, sendToDummy} from '../services/dummyService';

const router = express.Router();

router.post('/', (req, res) => {
    //makes sure the request is correctly formatted. WIP

    if (jsonValidation(req.body)) {
        const response = sendToDummy(req.body);
        res.send(response);
    } else {
        res.status(400).json({ error: 'bad request' });
    }
});

router.get('/*', (req, res) => {
    res.send(req.path);
});

export default router;
