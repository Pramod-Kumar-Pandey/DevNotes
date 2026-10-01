import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database connected successfully");
    }catch(err){
        console.log("Database not connected");
        console.log(err.message);
    }

}
export default connectDB;