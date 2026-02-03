import {body} from "express-validator";

const userRegisterValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is Invalid"),
        body('username')
            .trim()
            .notEmpty().withMessage("username is required")
            .isLength({min: 3}).withMessage("username should be atleast 3 char")
            .isLength({max: 13}).withMessage("username cannot exceed 13 char")
            .isLowercase().withMessage("Username must be in all lowercase"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({min:8}).withMessage("Password must be at least 8 characters long")
    ]
}

const userLoginValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is Invalid"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({min:8}).withMessage("Password must be at least 8 characters long") 
    ]   
}

export {userRegisterValidator, userLoginValidator};