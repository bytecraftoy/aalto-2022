/**
 * Router which returns the parameter presets stored in the backend
 * GET /api/presets
 * presets stored in /backend/files/ai_presets.json
 */
import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

const presetsRouter = Router();

presetsRouter.get(
    '/',
    // eslint-disable-next-line @typescript-eslint/require-await
    expressAsyncHandler(async (req: Request, res: Response) => {
        res.status(200).sendFile('files/ai_presets.json', { root: '.' });
    })
);

export { presetsRouter };
