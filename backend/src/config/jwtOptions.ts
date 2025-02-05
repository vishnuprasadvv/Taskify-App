import { config } from "./config";

interface ITokenOptions {
    expires : Date,
    maxAge : number,
    httpOnly: boolean,
    sameSite: 'strict' | 'none' | undefined;
    secure? : boolean
}

const accessTokenExpire = 1;

export const accessTokenOptions : ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire  * 24 * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly : true,
    sameSite: config.App.ENVIRONMENT === 'production' ? 'none' : 'strict',
    secure : config.App.ENVIRONMENT === 'production'
}