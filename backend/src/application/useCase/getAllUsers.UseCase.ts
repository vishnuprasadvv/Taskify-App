import { UserRepository } from "../../infrastructure/database/repository/userRepository";

export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute() {
        return this.userRepository.getAllUsers()
    }
}