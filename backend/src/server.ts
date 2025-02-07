import express, { NextFunction, Request, Response } from 'express';
import { config } from './config/config';
import { connectDB } from './infrastructure/database/mongoose';
import authRouter from './interface/routes/authRoutes';
import taskRouter from './interface/routes/taskRoutes';
import userRouter from './interface/routes/userRoutes';
import bodyParser from 'body-parser'
import { errorHandler } from './interface/middlewares/errorHandler';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import './utils/cron';

const app = express();
const PORT = config.App.PORT


const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: config.cors.CLIENT_URL,
        methods: config.cors.ALLOWED_METHODS,
        credentials: config.cors.CREDENTIALS
    }
})

io.on('connection', (socket) => {
    console.log('New client connected', socket.id)

    socket.on('join-room', (userId:string) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`)
    })

    socket.on('taskAdded', data => {

        const {task, assignedUserId, adminId} = data;

        io.to(assignedUserId).emit('taskAssigned', task);

        io.to(adminId).emit('adminTaskUpdate', task)

        console.log(`Task added by admin ${adminId} for user ${assignedUserId}`)
    });

    socket.on('taskStatusUpdated', (data) => {
        const {task, adminId, userId} = data;

        io.to(adminId).emit('adminTaskStatusUpdated', task);
        io.to(userId).emit('taskStatusChangeConfirmed' , task)

        console.log(`user ${userId} updated task status for admin ${adminId}`)
    })

    socket.on('taskUpdated', (task) => {
        const {assignedTo, userId} = task;

        io.to(assignedTo).emit('taskUpdated', task);

        io.to(userId).emit('adminTaskModified', task);

        console.log(`Task updated by admin ${userId} for user ${assignedTo}`)
    })

    socket.on('taskDeleted', (data) => {

        const {taskId, assignedUserId, adminId} = data;

        io.to(assignedUserId).emit('taskRemoved', taskId)

        io.to(adminId).emit('adminTaskDeleted', taskId)

        console.log(`Task deleted by admin ${adminId} for user ${assignedUserId}`)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })

})

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
app.use('/api/task', taskRouter )
app.use('/api/user', userRouter )

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

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB();
})

