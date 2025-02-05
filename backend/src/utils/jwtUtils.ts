import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const ACCESS_TOKEN_SECRET = config.jwt.ACCESS_TOKEN_SECRET;

export const generateAccessToken = (payload: {id: string}): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

export const verifyAccessToken = (token: string) : {id: string} | null => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as {id: string}
    } catch (error) {
        console.error('Error verify accesstoken')
        throw error;
    }
}

