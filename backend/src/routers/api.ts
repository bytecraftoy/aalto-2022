import { Router, Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
    validateApiRequest,
    ValidationError,
    sendToProxy,
    ProxyError,
    responseGen,
    createPrompt,
} from '../services';
import { logger } from '../utils/logger';

const apiRouter = Router();

apiRouter.post(
    '/',
    expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const body = req.body as string;

            try {
                //Validate request and collect fields from ApiRequest
                const { id, prompt, contexts } = await validateApiRequest(body);

                //Retrieve GPT3 response from proxy, and create our response based on it
                const gpt = await sendToProxy(createPrompt(contexts, prompt));
                res.json(responseGen(gpt, id));
            } catch (e) {
                if (e instanceof ValidationError) {
                    logger.error(`Validation failed:\n${e}\nRequest:\n${body}`);
                    res.status(400).send(e.toString());
                } else if (e instanceof ProxyError) {
                    logger.error(`Proxy service unavailable:\n${e}`);
                    res.status(502).send(e.toString());
                } else {
                    next(e);
                }
            }
        }
    )
);

export { apiRouter };
