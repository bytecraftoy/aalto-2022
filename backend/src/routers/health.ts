import express from 'express';
import fs from 'fs';

const version = (() => {
    try {
        return fs.readFileSync('./files/timestamp-commit').toString();
    } catch (e) {
        console.error(e);
        return 'N/A';
    }
})();

const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    res.json({
        status: 'OK',
        version,
    });
});

export { healthRouter };
