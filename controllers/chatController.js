import user_model from "../models/User.js";

export const saveChat = async (req,res)=>{
    
    try {

        const {userId,role,content}= req.body;

        if(!userId || !role || !content || content.trim().length === 0){
            return res.status(400).json({message:"Invalid input .chat message cannot be empty"});
        }

        if(!["user","assistant"].includes(role)){
            return res.status(400).json({message:"Invalid role. Role must be 'user' or 'assistant'"});
        }

        if(content.length > 5000){
            return res.status(400).json({message:"Invalid input. Chat message cannot exceed 5000 characters"});
        }

        let user = await user_model.findById(userId);
        if(!user) return res.status(400).json({message:"User not found"});

        user.chats.push({role,content});
        user.lastOnlineAt = Date.now();
        await user.save();

        res.json({message:"Chat saved successfully"});

    }catch(err){
        return res.status(500).json({message:"Error saving chat"});
    }

}


export const getchats = async (req,res)=>{
   try{

    const {userId} = req.params;
    if(!userId) {
        return res.status(400).json({message:"User ID is required"});
    }

    let user = await user_model.findById(userId);
    if(!user) return res.status(400).json({message:"User not found"});

    res.json(user.chats);

   }catch(err){
    return res.status(500).json({message:"Error getting chat"});
}
}

export const clearchatHistory = async (req,res) =>{
   try{

    const {userId} = req.body;
    if(!userId) {
        return res.status(400).json({message:"User ID is required"});
    }

    const user = await user_model.findById(userId);
    if(!user) return res.status(400).json({message:"User not found"});

    user.chats = [];
    await user.save();

    res.json({message:"Chat history cleared successfully"});

   }catch(err){
    return res.status(500).json({message:"Error clearing chat history"});
   }
}