const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://omit1067ahmed:MKvo1DDOut8iRWbr@my-sites.snbiw9g.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const productsCollection = client.db("productsdataDB").collection("productsdata");
    // Connect the client to the server	(optional starting in v4.7)
    app.get("/productsdata", async (req,res)=> {
     console.log(req.query.title);
     let query = {};
     if(req.query.title){
      query={title:req.query.title };
     }
     const result = await productsCollection.find(query).toArray();
     res.send(result);
    })
    
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
}
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

