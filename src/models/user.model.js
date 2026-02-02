import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"


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


// ----------------------------------------- //

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccesstoken = function(){
    return jwt.sign(
            {
                _id : this._id,
                email: this.email,
                username: this.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
    )
}


userSchema.methods.generateRefreshtoken = function(){
    return jwt.sign(
            {
                _id : this._id,
                email: this.email,
                username: this.username
            },
            process.env.Refresh_TOKEN_SECRET,
            {
                expiresIn: process.env.Refresh_TOKEN_EXPIRY
            }
    )
}


userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const HashedToken = crypto
                        .createHash("sha26")
                        .update(unHashedToken)
                        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000)

    return {HashedToken, tokenExpiry};
}


// -------------------------------------------- //

const User = mongoose.model("User", userSchema);

export default User;