import { Router, Request, Response, NextFunction } from 'express';
import {
    validateJson,
    ValidationError,
    sendToProxy,
    responseGen,
    createPrompt,
} from '../services';
import { ApiRequest } from '../types';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as string;

    //Validate request json
    try {
        validateJson(body);
    } catch (e) {
        if (e instanceof ValidationError) {
            console.log(`Validation failed:\n${e}\nRequest:\n${body}`);
            res.status(400).send(e.toString());
        } else {
            next(e);
        }
        return;
    }

    //Request is safe to parse, collect relevant fields
    const { id, prompt, contexts } = JSON.parse(body) as ApiRequest;

    //Todo: proper handling if proxy/dummy is not available, even if the actual request was valid
    //Currently gives back bad request, not sure if this is correct
    sendToProxy(createPrompt(contexts, prompt))
        .then((gpt) => {
            res.json(responseGen(gpt, id));
        })
        .catch((e) => {
            console.log(`Proxy/Dummy unavailable: ${e}`);
            res.status(400).send(e);
        });
});

export default router;
