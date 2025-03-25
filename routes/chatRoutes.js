import express from 'express';
import dotenv from "dotenv";
import {verifyUserToken} from "../utils/generateToken.js"
import {saveChat,getchats,clearchatHistory} from "../controllers/chatController.js";

dotenv.config();

//protected api

const chatsRouter = express.Router();

//when finally the frontend is going to work integrate verifyuser and verifyuserToken

chatsRouter.post("/",saveChat);

chatsRouter.get("/:userId",getchats);

chatsRouter.delete("/",clearchatHistory);


export default chatsRouter;

