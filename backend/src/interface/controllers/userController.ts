import { NextFunction, Request, Response } from "express";
import { GetTasksForUserUseCase } from "../../application/useCase/getTasksForUser";
import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";
import { UpdateTaskStatusUseCase } from "../../application/useCase/updateTaskStatusUseCase";

const taskRepository = new TaskRepository()

export const getTasksForUserController =  async(req:Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(!user) {
            throw new Error('User ID not found')
        }
        const useCase = new GetTasksForUserUseCase(taskRepository)
        const tasks = await useCase.execute(user.id)
        res.status(200).json({success: true, message: 'Fetched tasks for user', data: tasks})
    } catch (error) {
        next(error)
    }
}
export const updateTaskStatusController =  async(req:Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const{status} = req.body;
        if(!id || !status) {
            throw new Error('No input found')
        }
        const user = req.user;
        if(!user) {
            throw new Error('User ID not found')
        }
        const useCase = new UpdateTaskStatusUseCase(taskRepository)
        const tasks = await useCase.execute(id, status)
        res.status(200).json({success: true, message: 'Status updated', data: tasks})
    } catch (error) {
        next(error)
    }
}