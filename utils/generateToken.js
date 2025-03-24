import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { COOKIE_NAME } from "./constants.js";

dotenv.config();
export const generateToken=(user)=>{
  return jwt.sign({email:user.email, id:user._id},process.env.JWTSECRET,{expiresIn:"7days",});
}

export const verifyUserToken = async (req,res,next)=>{
  if(!token || token.trim() === ""){
    return res.status(401).json({message:"Token not received"});
  }

  const token = req.signedCookies[`${COOKIE_NAME}`];
  return new Promise((resolve,reject)=>{
    return jwt.verify(token,process.env.JWTSECRET,(err,success)=>{
      if(err){
        reject(err);
        res.status(401).json({message:"Token expired"});
      }else{
        resolve();
        res.locals.jwtData=success;
        return next();
      }
    })
  })
   
};