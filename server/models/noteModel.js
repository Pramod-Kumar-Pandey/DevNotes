import mongoose from "mongoose";
import User from "./userModel.js";

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required :true,
        trim:true,
    },
    content:{
        type: String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:["Java", "JavaScript", "React", "Node.js", "Database", "DSA","Python","C++","Other"],
    },
    tags:{
        type:[String]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true})

const Note=mongoose.model("Note",noteSchema);
export default Note;