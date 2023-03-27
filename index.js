const express = require('express');
const mongoose = require('mongoose');
const cors= require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
const userRoutes=require("./routes/userRoutes")
const postRoutes=require("./routes/postRoutes")
// console.log(userRoutes)
const connection=async ()=>{
    try{
        await mongoose.connect(process.env.mongo_url)
        console.log("connected")
    }
    catch(err){
        console.log(err)
    }

}

app.use("/user",userRoutes)
app.use("/post",postRoutes)

app.listen(8080,()=>{
    connection()
    console.log("on port 8080")
})