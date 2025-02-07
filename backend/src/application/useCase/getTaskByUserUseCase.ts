import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class GetTasksByUserUseCase {
    constructor(private taskRepository : TaskRepository){}

    async execute(userId: string) {
        return this.taskRepository.findAllById(userId);
    }
}