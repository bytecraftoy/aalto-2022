import express, { NextFunction, Request, Response } from 'express';
import { validatePrompt, ValidationError } from './../services/validatePrompt';
import { generateData } from './../services/generateData';
//import { Prompt } from './../types/Prompt';

const textGenRouter = express.Router();

textGenRouter.post(
    '/',
    (req: Request, res: Response, next: NextFunction): void => {
        const body: string = req.body as string;
        try {
            validatePrompt(body);
        } catch (e) {
            if (e instanceof ValidationError) {
                console.log(`Validation failed:\n${e}\ndata:\n${body}`);
                res.status(400).send(e.toString());
            } else {
                next(e);
            }
            return;
        }
        //Prompt is unused, as it is not actually used to select the generated response
        //const prompt: Prompt = JSON.parse(body) as Prompt;
        res.json(generateData());
    }
);

export { textGenRouter };
