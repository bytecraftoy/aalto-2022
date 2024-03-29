/**
 * Router which returns server health
 * GET /api/health
 */
import express from 'express';
import fs from 'fs';
import { logger } from '../utils/logger';

const version = (() => {
    try {
        return fs.readFileSync('./files/timestamp-commit').toString();
    } catch (e) {
        logger.error('version_file_missing', { e });
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
