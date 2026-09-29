// database connection
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI
// const client = new MongoClient(URI);

async function connectDB() {
  try {
    //MongoDB connection .env
    await mongoose.connect(URI);

    console.log('Successfully connected to MongoDB Atlas!');
    console.log('Connection file - Mongoose state: ', mongoose.connection.readyState);
    
    
  } catch (error) { console.error('MongoDB connection error:', error);
    
  process.exit(1)
  }
}

module.exports = connectDB;
