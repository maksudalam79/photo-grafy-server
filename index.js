const express=require ("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require("cors");
require("dotenv").config();
const app=express();
const port=process.env.PORT||5000;

// middleWere:---
app.use(cors())
app.use(express.json())

// mongodb:---



// testing:---
app.get('/',(req,res)=>{
    res.send('Assignment 11 is running')
})
app.listen(port,()=>{
    console.log(`Assignment 11 is running on this ${port}`)
})