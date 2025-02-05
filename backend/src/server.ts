import express, { NextFunction, Request, Response } from 'express';
import { config } from './config/config';
import { connectDB } from './infrastructure/database/mongoose';
import authRouter from './interface/routes/authRoutes';
import bodyParser from 'body-parser'
import { errorHandler } from './interface/middlewares/errorHandler';
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();
const PORT = config.App.PORT


//Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())

app.use(cors({
    origin: config.cors.CLIENT_URL,
    allowedHeaders: config.cors.ALLOWED_HEADERS,
    methods: config.cors.ALLOWED_METHODS,
    credentials: config.cors.CREDENTIALS
}))

app.use('/api/auth', authRouter )

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({success : true ,message: 'Connection successful.'})
})

app.all('*', (req:Request, res: Response, next : NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err)
})
 

//error hanlder 
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB();
})