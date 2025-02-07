import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyAccessToken } from "../../utils/jwtUtils";
import { UserRepository } from "../../infrastructure/database/repository/userRepository";

const userRepository = new UserRepository()
export const isAuthenticated = async ( req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    console.log('accesstoken', accessToken)

    if(!accessToken) {
        res.status(401).json({message : 'accessToken expired'})
        return;
    }

    try {
        const decode = verifyAccessToken(accessToken);
        if(!decode) {
            res.status(401).json({message : 'Invalid accessToken'})
            return;
        }

        const user = await userRepository.findById(decode.id)
        
        if(!user) {
            res.status(404).json({message: 'User not authorized'})
            return;
        }

        req.user = {
            id: user._id.toString(),
            role: user.role
        }
        next()
    } catch (error) {

        console.log('isAuthenticated error', error)

        if(error instanceof TokenExpiredError) {
            res.status(401).json({message : 'accessToken expired'})
        }else if(error instanceof JsonWebTokenError) {
            res.status(401).json({message : 'Invalid accessToken'})
        }else{
            res.status(401).json({message : 'Invalid accessToken'})
        }
    }
}
export const isAdminAuthenticated = async ( req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.adminAccessToken;

    console.log('adminAccesstoken', accessToken)

    if(!accessToken) {
        res.status(401).json({message : 'adminAccessToken expired'})
        return;
    }

    try {
        const decode = verifyAccessToken(accessToken);
        if(!decode) {
            res.status(401).json({message : 'Invalid adminAccessToken'})
            return;
        }

        const user = await userRepository.findById(decode.id)
        
        if(!user) {
            res.status(404).json({message: 'User not authorized'})
            return;
        }

        req.user = {
            id: user._id.toString(),
            role: user.role
        }
        next()
    } catch (error) {

        console.log('isAuthenticated error', error)

        if(error instanceof TokenExpiredError) {
            res.status(401).json({message : 'adminAccessToken expired'})
        }else if(error instanceof JsonWebTokenError) {
            res.status(401).json({message : 'Invalid adminAccessToken'})
        }else{
            res.status(401).json({message : 'Invalid adminAccessToken'})
        }
    }
}