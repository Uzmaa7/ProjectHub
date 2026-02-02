import mongoose from "mongoose";

const connectdb = async () => {
    try{

        await mongoose.connect(proccess.env.MONGO_URI)
        console.log("MONGODB connected")

    }
    catch(error){
        console.error("MONGODB connection FAILED !!", error);
        process.exit(1);
    }

}

export default connectdb;