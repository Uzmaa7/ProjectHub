import mongoose from "mongoose";
import {AvailableUserRoles} from "../utils/constants.js"

const projectMemberSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    role: {
        type: String,
        enum: [AvailableUserRoles],
        default: UserRolesEnum.MEMBER
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    }


}, {timestamps:true});


const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);

export default ProjectMember;