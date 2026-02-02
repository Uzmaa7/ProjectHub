import mongoose from "mongoose";
import {AvailableTaskStatus} from "../utils/constants.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "project ref is required"]
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: [AvailableTaskStatus],
        default: TaskStatusEnum.TODO
    },

    attachments: {
        type: [{url: String, mimetype: String, size: Number}],
        default: []
    }


}, {timestamps:true});


const Task = mongoose.model("Task", taskSchema);

export default Task;