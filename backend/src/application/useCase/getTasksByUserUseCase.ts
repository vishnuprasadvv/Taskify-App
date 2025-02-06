import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class GetAllTasksUseCase {
    constructor(private taskRepository : TaskRepository){}

    async execute(id:string) {
        return this.taskRepository.findAllById(id);
    }
}