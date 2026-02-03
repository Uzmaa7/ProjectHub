import {asyncHandler} from "../utils/async-handler.js"

const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;

    //validate
    //----1----------
    // if(!email || !password){

    // }
    // if(password.length < 8){

    // }
    //--------2----------------
    // const isValidated = validateMe(password)


    // ---------3-----------------------
    registrationValidation(body);
})