import dotenv from "dotenv";
import bcrypt from "bcrypt";
import user_model from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import {COOKIE_NAME} from "../utils/constants.js";

dotenv.config();

export const signup = async (req, res) => {
    try {
        let { email, password } = req.body;

        let existUser = await user_model.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        bcrypt.genSalt(parseInt(process.env.GENSALT), (err, salt) => {
            if (err) return res.status(500).json({ message: "Error generating salt" });

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({ message: "Error generating hash" });

                try {
                    let user = await user_model.create({
                        email,
                        password: hash,
                    });
                    res.clearCookie(COOKIE_NAME)

                    let token = generateToken(user);
                    const expires = new Date();
                    expires.setDate(expires.getDate() + 7)
                    res.cookie(COOKIE_NAME, token,{
                        expires,
                    });
                    res.json({ message: "User created successfully",email: user.email});
                } catch (error) {
                    if (error.name === "ValidationError") {
                        return res.status(400).json({ message: "Invalid email format. Only Gmail accounts are allowed." });
                    }
                    res.status(500).json({ message: "Server error" });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await user_model.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Error comparing password" });

            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password" });
            }

            res.clearCookie(COOKIE_NAME)

            let token = generateToken(user);
            const expires = new Date();
            expires.setDate(expires.getDate() + 7)
            res.cookie(COOKIE_NAME, token,{
                expires,
            });
            res.json({ message: "User logged in successfully",email: user.email});
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const verifyUser = async (req,res)=>{
    try{
          const user = await user_model.findById(res.locals.jwtdata.id);
          if(!user){
            return res.status(401).json({ message: "Unauthorized or token malfunctioned" });
          }
          if(user._id.toString()!==res.locals.jwtData.id){
                return res.status(401).json({ message: "Permissions didnt match" });
          }
          return res.status(200).json({ message:"OK",email:user.email});
    }catch(err){
       return res.status(500).json({message:"Internal server error"})
    }
}

export const getUser = async (req,res)=>{
    try{
        const {email} = req.query;
        
        if(!email){
            return res.status(400).json({ message:"Email is required"});
        }
          
        const user = await user_model.findOne({email});
        if(!user){
            return res.status(404).json({ message:"User not found"});
        }

        res.json({userId:user._id})

    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}

