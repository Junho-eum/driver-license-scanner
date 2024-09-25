import { MongoClient } from "mongodb";

if (process.env.MONGO_USERNAME == null) {
  console.error("Missing environment variable MONGO_USERNAME");
  process.exit();
}
if (process.env.MONGO_PASSWORD == null) {
  console.error("Missing environment variable MONGO_USERNAME");
  process.exit();
}
if (process.env.MONGO_HOST == null) {
  console.error("Missing environment variable MONGO_HOST");
  process.exit();
}
if (process.env.MONGO_HOST_PORT == null) {
  console.error("Missing environment variable MONGO_HOST_PORT");
  process.exit();
}

const connectionString =
  "mongodb://" +
  process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD +
  "@" + process.env.MONGO_HOST + ":" + process.env.MONGO_HOST_PORT;

let _mongodb = null;

async function getMongoDBInstance() {
  if (!_mongodb || !_mongodb.topology || !_mongodb.topology.isConnected()) {
    try {
      // Create and connect the MongoClient if it doesn't exist
      const client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      _mongodb = await client.connect();
      console.log("MongoDB connected successfully!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error; // Throw error for handling in other parts of the app
    }
  }

  return _mongodb; // Return the MongoClient instance
}

async function getDBSurvey() {
  let cli = await getMongoDBInstance();
  return cli.db("survey");
}

export default { getMongoDBInstance, getDBSurvey };