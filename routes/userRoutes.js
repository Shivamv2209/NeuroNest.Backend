import express from "express";
import dotenv from "dotenv";
import { signup,login,logout } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.post('/logout',logout);

export default userRouter;