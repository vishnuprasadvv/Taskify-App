import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class GetTasksForUserUseCase {
    constructor(private taskRepository: TaskRepository){}

    async execute(userId: string) {
        return this.taskRepository.getTasksForUser(userId)
    }
}