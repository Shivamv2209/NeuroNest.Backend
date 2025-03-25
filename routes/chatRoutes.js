import express from 'express';
import dotenv from "dotenv";
import {verifyUserToken} from "../utils/generateToken.js"
import {saveChat,getchats,clearchatHistory} from "../controllers/chatController.js";

dotenv.config();

//protected api

const chatsRouter = express.Router();

chatsRouter.post("/",saveChat);

chatsRouter.get("/:userId",getchats);

chatsRouter.delete("/",clearchatHistory);


export default chatsRouter;

