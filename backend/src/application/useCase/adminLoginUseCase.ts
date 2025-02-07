import { UserRepository } from "../../infrastructure/database/repository/userRepository";

export class adminLoginUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string) {
        if(!password) {
            throw new Error('Email is required')
        }

        const user = await this.userRepository.authenticateAdmin(email, password)
        return user;
    }
}