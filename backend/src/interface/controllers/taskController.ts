import { NextFunction, Request, Response } from "express";
import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";
import { CreateTaskUseCase } from "../../application/useCase/createTaskUseCase";
import { GetAllTasksUseCase } from "../../application/useCase/getTasksByUserUseCase";
import { UpdateTaskUseCase } from "../../application/useCase/updateTaskUseCase";
import { DeleteTaskUseCase } from "../../application/useCase/deleteTaskUseCase";

const taskRepository = new TaskRepository()

export const createTaskController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(!user) {
            throw new Error('User not authorized')
        }
        const {title, description, dueDate} = req.body;
        console.log(title, description, dueDate)

        const useCase = new CreateTaskUseCase(taskRepository)
        const result = await useCase.execute({userId: user.id, description, title, dueDate})

        console.log(result)
        res.status(200).json({success: true, message: 'New task created', data: result})

    } catch (error) {
        next(error)
    }
}

export const getAllTasksController = async(req: Request, res: Response, next: NextFunction) => {
    try {
         const userId = '67a39abff1c1fe610bf54563'

         if(!userId) {
            throw new Error('User ID not found')
         }

         const useCase = new GetAllTasksUseCase(taskRepository)
         const result = await useCase.execute(userId)
         console.log(result)

         res.status(200).json({success: true, message: 'All tasks fetched', data: result})
    } catch (error) {
        next(error)
    }
}

export const updateTaskController = async(req:Request, res: Response, next: NextFunction) => {
 try {
    const {id} = req.params;
    const { title, description, dueDate, status} = req.body;

    if(!id) {
        throw new Error('Task ID not found')
    }
    if(!title || !description || !dueDate) {
        throw new Error('All fields required')
    }
    console.log(dueDate)
    const useCase = new UpdateTaskUseCase(taskRepository)
    const updated = await useCase.execute(id, {title, description, dueDate, status})
    console.log(updated)

    res.status(200).json({success: true, message : 'Task updated successfully', data: updated})
 } catch (error) {
    next(error)
 }
}

export const deleteTaskController = async(req:Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        console.log(req.params.id)
       
        if(!id) {
            throw new Error('Task ID not found')
        }

        const useCase = new DeleteTaskUseCase(taskRepository);
        const deleted= await useCase.execute(id)
        console.log(deleted)
        res.status(200).json({success: true, message : 'Task deleted successfully.'})
        
    } catch (error) {
        next(error)
    }
}