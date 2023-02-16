import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import fs from 'fs';

const data = fs.readFileSync('files/ai_presets.json', 'utf8');

const presetsRouter = Router();

presetsRouter.get(
    '/',
    // eslint-disable-next-line @typescript-eslint/require-await
    expressAsyncHandler(async (req: Request, res: Response) => {
        res.status(200).type('application/json').send(data);
    })
);

export { presetsRouter };
