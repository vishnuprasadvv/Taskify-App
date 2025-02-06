import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class DeleteTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(id: string) {

        return await this.taskRepository.delete(id)
    }
}