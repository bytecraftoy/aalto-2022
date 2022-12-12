import express from 'express';

const mirrorRouter = express.Router();

mirrorRouter.post('/', (req, res) => {
    res.send(req.body);
});

mirrorRouter.get('/*', (req, res) => {
    res.send(req.path);
});

export { mirrorRouter };
