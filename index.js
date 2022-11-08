const express=require ("express");
const cors=require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const app=express();
const port=process.env.PORT||5000;

// middleWere:---
app.use(cors())
app.use(express.json())

// mongodb:---
const uri =`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.2q6mq2n.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
async function run(){
    try{
const serviceCollection=client.db("photographer").collection("service")
app.get("/service",async(req,res)=>{
    const query={};
    const cursor=serviceCollection.find(query).limit(3)
    const services=await cursor.toArray()
    res.send(services)
})
    }
    finally{

    }
}
run().catch(error=>console.log(error))


// testing:---
app.get('/',(req,res)=>{
    res.send('Assignment 11 is running')
})
app.listen(port,()=>{
    console.log(`Assignment 11 is running on this ${port}`)
})