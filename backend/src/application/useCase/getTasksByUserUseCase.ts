import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class GetAllTasksUseCase {
    constructor(private taskRepository : TaskRepository){}

    async execute() {
        return this.taskRepository.findAll();
    }
}