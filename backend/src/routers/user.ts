import express, { CookieOptions } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {logger} from './../utils/logger';
import {
    parseLoginInfo,
    checkPassword,
    createToken
} from './../services/userService';

const tokenCookieName = 'user-token';

const getTokenCookieOptions = (subdomain: string | undefined): CookieOptions => {
    return {
        domain: subdomain,
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    };
};

const userRouter = express.Router();

userRouter.post('/login/', expressAsyncHandler(async (req, res) => {
    try{
        const info = parseLoginInfo(req.body as string);
        if(await checkPassword(info.name, info.password)){
            const token = await createToken(info.name);
            const options = getTokenCookieOptions(req.headers.host);
            res.cookie(tokenCookieName, token, options);
            res.status(204).end();
            return;
        }
    }catch(e){
        logger.error(e);
    }
    res.status(400).end();
}));

export {
    userRouter,
    tokenCookieName,
    getTokenCookieOptions
};