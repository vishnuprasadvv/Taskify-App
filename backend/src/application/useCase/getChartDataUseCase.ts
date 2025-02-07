import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class GetChartDataUseCase {
    constructor(private taskRepository: TaskRepository) {}

    async execute(userId:string) {
        return await this.taskRepository.getTaskStatusCounts(userId);
    }
}