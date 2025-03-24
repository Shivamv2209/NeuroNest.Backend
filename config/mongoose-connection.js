import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

mongoose
    .connect(uri)
    .then(()=>{
        console.log(`connected to the database`);
    });
    


    export default mongoose.connection;

