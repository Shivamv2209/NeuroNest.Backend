import express from "express";
import db from "./config/mongoose-connection.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";

dotenv.config();


const app= express();
const port = 3000;



app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({extended:true}));

app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("helo world");
});



app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})