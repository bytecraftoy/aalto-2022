/**
 * This router handles communication between frontend and proxy/dummy
 * POST /api/textgen
 * Request validation done with validateApiRequests.ts
 * and prompt handling done with textGenService.ts
 */
import { Router, Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
    validateApiRequest,
    sendToProxy,
    ProxyError,
    responseGen,
    createPrompt,
    createSimplePrompt,
    ValidationError,
} from '../services';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

const apiRouter = Router();

apiRouter.post(
    '/',
    expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const body = req.body as string;

            try {
                //Validate request and collect fields from ApiRequest
                const { id, prompt, contexts, parameters } =
                    await validateApiRequest(body);

                //Retrieve GPT3 response from proxy, and create our response based on it
                const gpt = await sendToProxy(
                    // createPrompt(
                    //     contexts,
                    //     prompt,
                    //     parameters.creativity,
                    //     parameters.quality,
                    //     parameters.inputLength,
                    //     parameters.outputLength
                    // )

                    createSimplePrompt(
                        contexts,
                        prompt,
                        parameters.creativity,
                        parameters.quality,
                        parameters.inputLength,
                        parameters.outputLength
                    )
                );
                res.json(responseGen(gpt, id));
            } catch (e) {
                if (e instanceof ZodError || e instanceof ValidationError) {
                    logger.error('validation_fail', {
                        error: {
                            name: e.name,
                            message: e.message,
                            stack: e.stack,
                        },
                        body: body,
                    });
                    res.status(400).send(e.toString());
                } else if (e instanceof ProxyError) {
                    logger.error('proxy_unavailable', {
                        error: {
                            name: e.name,
                            message: e.message,
                            stack: e.stack,
                        },
                    });
                    res.status(502).send(e.toString());
                } else {
                    next(e);
                }
            }
        }
    )
);

export { apiRouter };
