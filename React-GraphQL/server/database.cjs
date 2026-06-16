const mongoose = require("mongoose");

const connectToDatabase = async (uri) => {
  console.log("connecting to database URI:", uri);
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB:", error && error.message ? error.message : error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
