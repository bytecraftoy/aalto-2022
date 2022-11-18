import express, {NextFunction, Request, Response} from 'express';
import {validatePrompt, ValidationError} from './../services/validatePrompt';
import {Prompt} from './../types/Prompt';
import { generateData } from './../services/generateData';

const textGenRouter = express.Router();

textGenRouter.post('/', (req: Request, res: Response, next: NextFunction): void => {
    const body: string = req.body as string;
    try{
        validatePrompt(body);
    }catch(e){
        if(e instanceof ValidationError){
            console.log(`Validation failed:\n${e}\ndata:\n${body}`);
            res.status(400).send(e.toString());
        }else{
            next(e);
        }
        return;
    }
    const prompt: Prompt = JSON.parse(body) as Prompt;
    const response: string = generateData(prompt);
    res.send(response);
});

export {textGenRouter};