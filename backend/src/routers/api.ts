import { Router, Request, Response } from 'express';
import {
    jsonValidation,
    promptGen,
    responseGen,
    sendToProxy,
} from '../services/textGenService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiRequest } from '../types/ApiTypes';

const router = Router();

router.post(
    '/',
    (req: Request<ParamsDictionary, unknown, ApiRequest>, res: Response) => {
        (async () => {
            if (jsonValidation(req.body)) {
                const id = req.body.id;
                const prompt = promptGen(req.body);
                const proxyResponse = await sendToProxy(prompt);
                const response = responseGen(proxyResponse, id);
                res.send(response);
            } else {
                res.status(400).json({
                    error: 'Bad request, json did not pass basic validation',
                });
            }
        })().catch(() => 'obligatory catch to please eslinter');
    }
);

export default router;
