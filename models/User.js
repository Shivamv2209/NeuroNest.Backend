import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    },
    password:{
        type:String,
    }
});

export default mongoose.model("users", userSchema);