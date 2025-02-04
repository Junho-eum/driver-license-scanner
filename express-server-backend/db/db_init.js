import mongodbConn from './connection.js';

async function initDB(dbName, collectionName) {
  console.log("Initializing database...");

  if(!dbName) {
    throw new Error("No database name provided");
  }
  if(!collectionName) {
    throw new Error("No collection name provided");
  }

  let client = await mongodbConn.getMongoDBInstance();
  const db = client.db(dbName);

  try {
    const existingDbs = await db.admin().listDatabases();
    const dbExists = existingDbs.databases.find((db) => db.name === dbName);

    // if the db doesn't exist, create it
    if (!dbExists) {
      console.log(`Database '${dbName}' does not exist. Creating...`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }

    const collection = db.collection(collectionName);
    const existingDocs = await collection.countDocuments();

    // if the collection doesn't exist, create it
    if (existingDocs === 0) {
      console.log(`Collection '${collectionName}' is empty. Creating initial document...`);
      const initialDoc = {PID: ".."};
      await collection.insertOne(initialDoc);
    } else {
      console.log(`Collection '${collectionName}' already contains documents.`);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await client.close();
  }
}

export default initDB;