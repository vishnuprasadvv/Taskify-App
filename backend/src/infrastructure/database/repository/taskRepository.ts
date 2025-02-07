

import mongoose, { Types } from "mongoose";
import { ITaskRepository } from "../../../application/interface/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import { TaskModel } from "../models/TaskModel"

interface PopulatedTask extends mongoose.Document {
    title: string;
    description: string;
    assignedTo: Types.ObjectId;
    userId: { _id: Types.ObjectId; name: string };
    dueDate: Date;
    _id: string
  }


export class TaskRepository implements ITaskRepository {
    
    async create(task:Task) {
        try {
            const createTask = new TaskModel(task)
            return await createTask.save();
        } catch (error:any) {
            throw new Error('Error creating task' + error.message)
        }
    }

    async findAll():Promise<Task[]> {
        try {
            return await TaskModel.find();
        } catch (error:any) {
            throw new Error('Error fetching tasks' + error.message)
        }
    }
    async findAllById(userId: string):Promise<Task[]> {
        try {
            const tasks =  await TaskModel.find({userId}).sort({createdAt: -1})
            
            return tasks.map(task => ({
                ...task.toObject(),
                userId : task.userId.toString() ,
                _id: task._id.toString(),
                assignedTo: task.assignedTo? task.assignedTo.toString() : undefined
            }))
        } catch (error:any) {
            throw new Error('Error fetching tasks' + error.message)
        }
    }

    async findById(id:string):Promise<Task | null>{ 
        try {
            return await TaskModel.findById(id)
        } catch (error:any) {
            throw new Error('Error fetching task' + error.message)
        }
    }

    async update(id:string, taskData: Partial<Task>) {
        try {
            const updatedTask = await TaskModel.findByIdAndUpdate(id, taskData, {
                new : true, 
                runValidators: true,
            })

            if(!updatedTask) {
                throw new Error('Task not found')
            }

            return updatedTask;

        } catch (error:any) {
            throw new Error('Error updating task: ' + error.message)
        }
    }

    async delete(id:string) {
        try {
            const deletedTask = await TaskModel.findByIdAndDelete(id)
            if(!deletedTask) {
                throw new Error('Task not found')
            }
            return deletedTask;
        } catch (error: any) {
            throw new Error('Error deleting task: ' + error.message )
        }
    }

    async getTasksForUser(userId: string):Promise<Task[]> {
        try {
            
            const tasks = await TaskModel.find({assignedTo: userId}).populate('userId', 'name').lean() as unknown as PopulatedTask[]

            return tasks.map(task => ({
                ...task,
                _id: task._id.toString(),
                assignedTo: task.assignedTo.toString(),
                userId:task.userId._id.toString(),
                adminName: task.userId.name
            }))

        } catch (error:any) {
            throw new Error('Error fetching user tasks: ' + error.message)
        }
    }

    async updateStatus(id:string, status: string) {
        try {
            const updatedTask = await TaskModel.findByIdAndUpdate(id, {status}, {
                new : true, 
                runValidators: true,
            })

            if(!updatedTask) {
                throw new Error('Task not found')
            }

            return updatedTask;

        } catch (error:any) {
            throw new Error('Error updating task: ' + error.message)
        }
    }

}