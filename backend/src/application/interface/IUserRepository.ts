import { User } from "../../domain/entities/User";

export interface IUserRepository {
    findById(userId:string) : Promise<User| null>
    findByEmail(email: string) : Promise<User | null>
    createUser(email: string, name: string, password: string) : Promise<User >
}