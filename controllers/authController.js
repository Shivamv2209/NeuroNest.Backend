import dotenv from "dotenv";
import bcrypt from "bcrypt";
import user_model from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

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

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.json({ message: "User created successfully" });
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

            let token = generateToken(user);
            res.cookie("token", token);
            res.json({ message: "User logged in successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = (req,res)=>{
    try{

        res.cookie("token","");
        res.status(200).json({ message: "User logged out successfully" });

    }catch(err){

        if(err) return res.status(500).json({message: "Error logging out"});

    }
}