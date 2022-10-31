import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    res.send(req.body);
});

router.get('/*', (req, res) => {
    res.send(req.path);
});

export default router;
