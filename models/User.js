import mongoose from "mongoose";
import {randomUUID} from "crypto";

const chatSchema = new mongoose.Schema({
    id:{
        type:String,
        default: randomUUID(),
    },
    role:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    },
    password:{
        type:String,
    },
    chats:[chatSchema],
    lastOnlineAt:{
        type: Date
    }
});

export default mongoose.model("users", userSchema);