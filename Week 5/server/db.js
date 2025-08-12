const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'bikeApp';
let db = null;

const connectToDb = async () => {
  if (db) return db;
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  return db;
};

module.exports.getCollection = async (collectionName) => {
  const database = await connectToDb();
  return database.collection(collectionName);
};
