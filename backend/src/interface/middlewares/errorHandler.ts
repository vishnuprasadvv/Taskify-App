import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('ERROR' ,error);

    res.status(500).json({
        success: false, 
        message : error.message || 'An unexpected error occured'
    })

}