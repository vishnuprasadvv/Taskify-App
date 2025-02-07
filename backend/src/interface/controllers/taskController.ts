import { NextFunction, Request, Response } from "express";
import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";
import { CreateTaskUseCase } from "../../application/useCase/createTaskUseCase";
import { GetAllTasksUseCase } from "../../application/useCase/getTasksByUserUseCase";
import { UpdateTaskUseCase } from "../../application/useCase/updateTaskUseCase";
import { DeleteTaskUseCase } from "../../application/useCase/deleteTaskUseCase";
import { io } from "../../server";
import { GetTasksByUserUseCase } from "../../application/useCase/getTaskByUserUseCase";
import { GetAllUsersUseCase } from "../../application/useCase/getAllUsers.UseCase";
import { UserRepository } from "../../infrastructure/database/repository/userRepository";
import { GetChartDataUseCase } from "../../application/useCase/getChartDataUseCase";

const taskRepository = new TaskRepository()
const userRepository = new UserRepository()

export const createTaskController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(!user) {
            throw new Error('User not authorized')
        }
        const {title, description, dueDate, assignedTo} = req.body;

        if(assignedTo === ''){
            throw new Error('Please select a user to assign task')
        }
        if(assignedTo === user.id) {
            throw new Error("You can't assign task to yourself")
        }
        console.log('assign', assignedTo)

        const useCase = new CreateTaskUseCase(taskRepository)
        const result = await useCase.execute({userId: user.id, description, title, dueDate, assignedTo})

        io.emit('taskAdded', result)
        res.status(200).json({success: true, message: 'New task created', data: result})

    } catch (error) {
        next(error)
    }
}

export const getTasksByUserController = async(req: Request, res: Response, next: NextFunction) => {
    try {
         const user = req.user;


         if(!user) {
            throw new Error('User not found')
         }

         const useCase = new GetTasksByUserUseCase(taskRepository)
         const result = await useCase.execute(user.id)

         res.status(200).json({success: true, message: 'All tasks by user fetched', data: result})
    } catch (error) {
        next(error)
    }
}

export const getAllTasksController = async(req: Request, res: Response, next: NextFunction) => {
    try {

         const useCase = new GetAllTasksUseCase(taskRepository)
         const result = await useCase.execute()

         res.status(200).json({success: true, message: 'All tasks fetched', data: result})
    } catch (error) {
        next(error)
    }
}

export const updateTaskController = async(req:Request, res: Response, next: NextFunction) => {
 try {
    const {id} = req.params;
    const { title, description, dueDate, status, assignedTo} = req.body;

    if(!id) {
        throw new Error('Task ID not found')
    }
    if(!title || !description || !dueDate) {
        throw new Error('All fields required')
    }
    if(assignedTo === req.user?.id) {
        throw new Error("You can't assign task yourself")
    }
    const useCase = new UpdateTaskUseCase(taskRepository)
    const updated = await useCase.execute(id, {title, description, dueDate, status, assignedTo})
    

    io.emit('taskUpdated', updated)

    res.status(200).json({success: true, message : 'Task updated successfully', data: updated})
 } catch (error) {
    next(error)
 }
}

export const deleteTaskController = async(req:Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
       
        if(!id) {
            throw new Error('Task ID not found')
        }

        const useCase = new DeleteTaskUseCase(taskRepository);
        await useCase.execute(id)
       
        io.emit('taskDeleted', id)
        res.status(200).json({success: true, message : 'Task deleted successfully.'})
        
    } catch (error) {
        next(error)
    }
}

export const getUsersController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const useCase = new  GetAllUsersUseCase(userRepository)
        const result = await useCase.execute()
        res.status(200).json({success:true, message: 'All users fetched', data: result})
    } catch (error) {
        next(error)
    }
}

export const getChartDataController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(!user){
            throw new Error('User ID not found')
        }
        const useCase = new  GetChartDataUseCase(taskRepository)
        const result = await useCase.execute(user.id)
        res.status(200).json({success:true, message: 'Chart data fetched', data: result})
    } catch (error) {
        next(error)
    }
}
