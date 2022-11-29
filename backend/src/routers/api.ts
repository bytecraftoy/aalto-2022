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
import { ApiRequest } from '../types';

const apiRouter = Router();

apiRouter.post(
    '/',
    expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const body = req.body as string;

            try {
                //Validate request
                await validateApiRequest(body);

                //Request is safe to parse, collect relevant fields
                const { id, prompt, contexts } = JSON.parse(body) as ApiRequest;

                //Retrieve GPT3 response from proxy, and create our response based on it
                const gpt = await sendToProxy(createPrompt(contexts, prompt));
                res.json(responseGen(gpt, id));
            } catch (e) {
                if (e instanceof ValidationError) {
                    console.log(`Validation failed:\n${e}\nRequest:\n${body}`);
                    res.status(400).send(e.toString());
                } else if (e instanceof ProxyError) {
                    console.log(`Proxy service unavailable:\n${e}`);
                    res.status(502).send(e.toString());
                } else {
                    next(e);
                }
            }
        }
    )
);

export { apiRouter };
