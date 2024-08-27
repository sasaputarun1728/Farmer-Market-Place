require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");

    // Fetch farmerdetails collection
    const fetched_data = await mongoose.connection.db.collection("farmerdetails").find({}).toArray();

    // Fetch foodCategory collection
    const catData = await mongoose.connection.db.collection("category").find({}).toArray();

    // Assigning the fetched data to global variables
    global.farmerdetails = fetched_data;
    global.foodCategory = catData;

  } catch (err) {
    console.log("---", err.message);
  }
};

module.exports = mongoDB;
