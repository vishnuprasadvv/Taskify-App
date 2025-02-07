import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name : {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default : 'user', required: true}
},{timestamps: true})


export const UserModel = mongoose.model('User', UserSchema);