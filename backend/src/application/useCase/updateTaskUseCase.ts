import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id:string, task:Partial<Task>) {
        return this.taskRepository.update(id, task)
    }
}