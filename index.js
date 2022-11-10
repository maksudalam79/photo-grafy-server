const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleWere:---
app.use(cors());
app.use(express.json());

// mongodb:---
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.2q6mq2n.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
async function run() {
  try {
    const serviceCollection = client.db("photographer").collection("service");
    const reviewCollection = client.db("photographer").collection("reviews");
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).limit(3);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/allservice", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.post("/services", async (req, res) => {
      const service = req.body;
      const services = await serviceCollection.insertOne(service);
      res.send(services);
    });
    app.get("/allservice/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    // review:---
    app.post("/reviews", async (req, res) => {
      const reviews = req.body;
      console.log(reviews);
      const result = await reviewCollection.insertOne(reviews);
      res.send(result);
    });
    app.get("/reviews", async (req, res) => {
      console.log(req.query);
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
    app.put('/reviews/:id',async(req,res)=>{
const id=req.params.id
console.log(id)
const filter={_id:ObjectId(id)}
const edit=req.body
const option={upsert:true}
const updateedit={
    $set:{
        massage:edit.massage
    }
   
}
const result=await reviewCollection.updateOne(filter,updateedit,option)
res.send(result)
console.log(edit)
    })
    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.findOne(query);
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

// testing:---
app.get("/", (req, res) => {
  res.send("Assignment 11 is running");
});
app.listen(port, () => {
  console.log(`Assignment 11 is running on this ${port}`);
});
