import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository){}

    async execute(taskData : Task){
        const task = await this.taskRepository.create(taskData)
        return task;
    }
}