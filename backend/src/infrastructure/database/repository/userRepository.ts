import { IUserRepository } from "../../../application/interface/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserModel } from "../models/UserModel";
import bcrypt from 'bcrypt'

export class UserRepository implements IUserRepository{

    async findById(userId: string): Promise<User | null> {
        return UserModel.findById(userId)
    }

    async findByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({email: email})
    }

    async createUser(email: string, name: string, password: string): Promise<User> {
       let hashPassword = await bcrypt.hash(password, 10)
       let user = await UserModel.create({email, name, password: hashPassword})

       return new User (user._id.toString(), user.email, user.name)
    }

    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await UserModel.findOne({email});

        console.log(user)
        if(!user){
            throw new Error('User not found, create account.')
        }

        let comparePassword = await bcrypt.compare(password, user.password)

        if(user && comparePassword){
            return new User(user._id.toString(), user.name, user.email)
        }
        if(user && !comparePassword) {
            throw new Error('Invalid credentials')
        }
        return null;
    }

}