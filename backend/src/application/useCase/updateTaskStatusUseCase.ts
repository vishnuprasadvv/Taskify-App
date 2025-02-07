import { TaskRepository } from "../../infrastructure/database/repository/taskRepository";

export class UpdateTaskStatusUseCase {
    constructor(private taskRepository: TaskRepository) {}
    
    async execute(id: string, status: string){
        return this.taskRepository.updateStatus(id, status)
    }
}