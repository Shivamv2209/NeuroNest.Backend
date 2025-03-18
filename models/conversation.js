import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    messages:[
        {
        sender:{
            type:String,
            enum: ["user","bot"],
            required:true,
        },
        text:{
            type:String,
            required:true,
        },
        timeStamp:{
            type:Date,
            default: Date.now,
        },
    }
    ],
    lastUpdated:{
        type:Date,
        default: Date.now,
    }

});

export default mongoose.model('Conversation',conversationSchema);