import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    App : {
        PORT : number
    }
}
export const config = {
    App : {
        PORT : process.env.PORT || 5000,
        ENVIRONMENT: process.env.ENVIRONMENT || 'development'
    },
    Mongodb: {
        URI : process.env.MONGO_URI
    },
    jwt : {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_secret'
    },
    cors: {
        CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
        ALLOWED_HEADERS : ['Content-Type', 'Authorization'],
        ALLOWED_METHODS : ["GET", "POST", "DELETE", "PUT","PATCH"],
        CREDENTIALS : true
    }
}