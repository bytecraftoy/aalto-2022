import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {logger} from './../utils/logger';
import {
    parseLoginInfo,
    checkPassword
} from './../services/userService';

const userRouter = express.Router();

userRouter.post('/login/', expressAsyncHandler(async (req, res) => {
    try{
        const info = parseLoginInfo(req.body as string);
        if(await checkPassword(info.name, info.password)){
            //TODO: create a token and add it as a cookie
            res.status(204).end();
            return;
        }
    }catch(e){
        logger.error(e);
    }
    res.status(400).end();
}));