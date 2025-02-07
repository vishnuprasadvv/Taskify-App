import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    status: {type: String, enum: ['pending', 'completed', 'due'], default: 'pending'},
    dueDate: {type: Date, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

}, {timestamps: true})

export const TaskModel = mongoose.model('Task', TaskSchema)