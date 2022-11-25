import { Router, Request, Response } from 'express';
import {
    jsonValidation,
    sendToDummy,
    promptGen,
    responseGen,
} from '../services/dummyService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ApiRequest } from '../types/ApiTypes';

//placeholder for eventual environment variable
const environment = process.env.ENVIRONMENT;

//returns true if dummy environment, subject to change
const environmentCheck = (env: string | undefined) => !env || env == 'dummy';

const router = Router();

router.post(
    '/',
    (req: Request<ParamsDictionary, unknown, ApiRequest>, res: Response) => {
        (async () => {
            if (jsonValidation(req.body)) {
                if (environmentCheck(environment)) {
                    //send to dummy
                    const id = req.body.id;
                    const prompt = promptGen(req.body);
                    const dummyResponse = await sendToDummy(prompt);
                    const response = responseGen(dummyResponse, id);
                    res.send(response);
                } else {
                    //Send to real api here placeholder for now
                    console.log('something wrong with the environment');
                }
            } else {
                res.status(400).json({
                    error: 'Bad request, json did not pass basic validation',
                });
            }
        })().catch(() => 'obligatory catch to please eslinter');
    }
);

export default router;
