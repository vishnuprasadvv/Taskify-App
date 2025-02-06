import { Task } from "../../domain/entities/Task";

export interface ITaskRepository{
    create(task:Task): void
    findAll():Promise<Task[]>
    findById(id:string):Promise<Task | null>
    update(id:string, taskData: Task):void
    delete(id:string):void

}