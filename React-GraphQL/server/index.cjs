
require("dotenv").config();

const connectToDatabase = require("./database.cjs");
const startServer = require("./server.cjs");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

(async () => {
  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI not set — using default local MongoDB:', MONGODB_URI);
  }
  await connectToDatabase(MONGODB_URI);

  try {
    await startServer(PORT);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
