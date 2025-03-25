import express from "express";
import dotenv from "dotenv";
import { signup,login, verifyUser,getUser } from "../controllers/authController.js";
import { verifyUserToken } from "../utils/generateToken.js";

const userRouter = express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.get("/auth-status",verifyUserToken,verifyUser);
userRouter.get("/getUser",getUser)

export default userRouter;