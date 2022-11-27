import express, { NextFunction, Request, Response } from 'express';
import { generateData, validatePrompt, ValidationError } from './../services';
import { DummyResponse, Prompt } from '../types';

const textGenRouter = express.Router();

textGenRouter.post(
    '/',
    (req: Request, res: Response, next: NextFunction): void => {
        const body = req.body as string;

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

        const response: DummyResponse = {
            gpt: generateData(),
            debug: {
                prompt: JSON.parse(body) as Prompt,
                date: new Date().toUTCString(),
            },
        };

        res.json(response);
    }
);

export { textGenRouter };
