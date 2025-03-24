import express from "express";
import dotenv from "dotenv";
import { signup,login } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);

export default userRouter;