require('dotenv').config();

// dependencies
const express = require('express');

const connectDB = require("./config/connection");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// const { MongoClient } = require('mongodb');
// const URI = process.env.MONGO_URI
// const client = new MongoClient(URI);

//Database
  //mongoDb connection
  // async function connectToMongoDB() {
  // //  try {
  // //   await client.connect();
  // //   console.log("You successfully connected to MongoDB!");

  // //   const db = client.db("test")

  // //   console.log(`Connected to the ${db.databaseName} database`);
    
  // //   // return client;
  // // } catch (error) {
  // //   console.dir(error);
  // // }
  // };

// middleware
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

//PORT
connectDB().then(() => { 
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
});