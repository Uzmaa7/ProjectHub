import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        lowercase: true,
        unique: true,
        index: true,
        trim: true
    },

    fullname: {
        type: String,
        required:true,
    },

    avatar: {
        type: {
            url: String,
            localpath: String
        },
        default: {
            url: `https://placehold.co/600x400`,
            localpath: ""
        }
    },

    email: {
        type: String,
        required:true,
        lowercase: true,
        unique: true,
        trim: true

    },

    password: {
        type: String,
        required:true,
        min: [8, "must be 8 characters long"]   
    },

    emailVerificationToken: {
        type: String
    },

    emailVerificationTokenExpiry: {
        type: Date
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    refreshToken:{
        type: String
    },


    forgotPasswordToken: {
        type: String,
    },

    forgotPasswordTokenExpiry: {
        type: Date,
    },



    
}, {timestamps:true});


const User = mongoose.model("User", userSchema);

export default User;