import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    //makes sure the request is correctly formatted. WIP
    const jsonValidation = (json: string) => true

    if (jsonValidation(req.body)) {
        res.send(req.body)
    }
    else {
        res.status(400).json({error: 'bad request'})
    }
});

router.get('/*', (req, res) => {
    res.send(req.path);
});

export default router;
