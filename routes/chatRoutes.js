import express from 'express';
import dotenv from "dotenv";
import {verifyUserToken} from "../utils/generateToken.js"

dotenv.config();

//protected api

const chatsRouter = express.Router();

chatsRouter.post("/new",verifyUserToken)

