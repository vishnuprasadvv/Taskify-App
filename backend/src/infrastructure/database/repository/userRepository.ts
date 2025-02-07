import { IUserRepository } from "../../../application/interface/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserModel } from "../models/UserModel";
import bcrypt from 'bcrypt'

export class UserRepository implements IUserRepository{

    async getAllUsers():Promise<User[]> {
        const users = await UserModel.find().sort('name')

        return users.map(user => ({
            ...user.toObject(),
            _id: user._id.toString(),
        }))
    }

    async findById(userId: string): Promise<User | null> {
        return UserModel.findById(userId)
    }

    async findByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({email: email})
    }

    async createUser(email: string, name: string, password: string, role?:string): Promise<User> {
       let hashPassword = await bcrypt.hash(password, 10)
       let user = await UserModel.create({email, name,role, password: hashPassword})

       return new User (user._id.toString(), user.email, user.name, user.role)
    }

    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await UserModel.findOne({email});

        if(!user){
            throw new Error('User not found, create account.')
        }
        if(user && user.role !== 'user'){
            throw new Error('User not found')
        }

        let comparePassword = await bcrypt.compare(password, user.password)

        if(user && comparePassword){
            return new User(user._id.toString(), user.name, user.email, user.role)
        }
        if(user && !comparePassword) {
            throw new Error('Invalid credentials')
        }
        return null;
    }

    async authenticateAdmin(email: string, password: string): Promise<User | null> {
        const user = await UserModel.findOne({email});

        if(!user){
            throw new Error('User not found, create account.')
        }

        let comparePassword = await bcrypt.compare(password, user.password)

        if(user && !comparePassword) {
            throw new Error('Invalid credentials')
        }
        if(user && user.role !== 'admin'){
            throw new Error('User not found')
        }

        if(user && comparePassword){
            return new User(user._id.toString(), user.name, user.email, user.role)
        }
       

        return null;
    }

}