import { UserRepository } from "../../infrastructure/database/repository/userRepository";

export class RegisterUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(email: string, name :string, password: string) {
        
        const findUserExists = await this.userRepository.findByEmail(email)

        if(findUserExists) {
            throw new Error('User already exists with this email')
        }

        const createUser = await this.userRepository.createUser(email, name, password)

        return createUser;
    }
}