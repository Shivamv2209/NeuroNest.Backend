import express from 'express';
import db from "./config/mongoose-connection.js"

const app = express();

const port =3000;

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
})