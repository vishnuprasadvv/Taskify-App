import e, { NextFunction, Request, Response } from "express";

import { UserRepository } from "../../infrastructure/database/repository/userRepository";
import { RegisterUseCase } from "../../application/useCase/registerUseCase";
import { generateAccessToken } from "../../utils/jwtUtils";
import { accessTokenOptions } from "../../config/jwtOptions";
import { LoginUseCase } from "../../application/useCase/loginUserUseCase";
import { adminLoginUseCase } from "../../application/useCase/adminLoginUseCase";

const userRepository = new UserRepository()

export const registerController = async(req: Request, res: Response, next:NextFunction) =>{

    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            throw new Error("All fields required")
        }
        const useCase = new RegisterUseCase(userRepository)
        const user = await useCase.execute(email, name, password)

        const accessToken = generateAccessToken({id: user._id})

        res.cookie('accessToken', accessToken , accessTokenOptions)

        res.status(200).json({success: true, message : 'User registration success.', data: {user, accessToken}})
    } catch (error) {
        next(error)
    }
}
export const registerAdminController = async(req: Request, res: Response, next:NextFunction) =>{

    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            throw new Error("All fields required")
        }
        let role = 'admin'
        const useCase = new RegisterUseCase(userRepository)
        const user = await useCase.execute(email, name, password, role)

        const accessToken = generateAccessToken({id: user._id})

        res.cookie('adminAccessToken', accessToken , accessTokenOptions)

        res.status(200).json({success: true, message : 'Admin registration success.', data: {user, accessToken}})
    } catch (error) {
        next(error)
    }
}


export const loginController= async(req:Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            throw new Error('All fields required')
        }

        const useCase = new LoginUseCase(userRepository)
        const user = await useCase.execute(email, password)
        if(!user){
            throw new Error('Login failed')
        }

        const accessToken = generateAccessToken({id: user._id})
        
        res.cookie('accessToken', accessToken, accessTokenOptions)

        res.status(200).json({success: true, message: "User logged in successfully.", data: {user, accessToken}})
    } catch (error) {
        next(error)
    }
}

export const adminLoginController= async(req:Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            throw new Error('All fields required')
        }

        const useCase = new adminLoginUseCase(userRepository)
        const user = await useCase.execute(email, password)
        if(!user){
            throw new Error('Login failed')
        }

        const accessToken = generateAccessToken({id: user._id})
        
        res.cookie('adminAccessToken', accessToken, accessTokenOptions)

        res.status(200).json({success: true, message: "Admin logged in successfully.", data: {user, accessToken}})
    } catch (error) {
        next(error)
    }
}

export const logoutController = async(req:Request, res: Response, next:NextFunction) => {
    try {
        res.clearCookie('accessToken')

        console.log('User logged out successfully.')
        res.status(200).json({success: true, message : "User loggedout successfully."})
    } catch (error) {
        next(error)
    }
}

export const adminLogoutController = async(req:Request, res: Response, next:NextFunction) => {
    try {
        res.clearCookie('adminAccessToken')

        console.log('Admin logged out successfully.')
        res.status(200).json({success: true, message : "Admin loggedout successfully."})
    } catch (error) {
        next(error)
    }
}