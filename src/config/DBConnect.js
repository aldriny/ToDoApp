import mongoose from "mongoose";

export default (MONGO_URL)=>{
    mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("connected to database");
    })
    .catch((error)=>{
        console.log("error connecting to database", error);
        process.exit(1);
    });
}