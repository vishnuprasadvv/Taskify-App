import { UserRepository } from "../../infrastructure/database/repository/userRepository";

export class LoginUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string) {
        if(!password) {
            throw new Error('Email is required')
        }


        const user = await this.userRepository.authenticateUser(email, password)
        return user;
    }
}