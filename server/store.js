const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "data", "db.json");
const mongoUri = process.env.MONGODB_URI;
let mongoCollectionPromise;

async function readFileDb() {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

function stripMongoId(doc) {
  if (!doc) return doc;
  const { _id, ...db } = doc;
  return db;
}

function getMongoDbName() {
  if (process.env.MONGODB_DB) return process.env.MONGODB_DB;

  try {
    const parsed = new URL(mongoUri);
    const dbName = decodeURIComponent(parsed.pathname.replace(/^\//, ""));
    return dbName || "sitesnap";
  } catch (_error) {
    return "sitesnap";
  }
}

async function getMongoCollection() {
  if (!mongoUri) return null;

  if (!mongoCollectionPromise) {
    mongoCollectionPromise = (async () => {
      let MongoClient;
      try {
        ({ MongoClient } = require("mongodb"));
      } catch (_error) {
        throw new Error("MONGODB_URI is set, but the mongodb package is not installed. Run npm install first.");
      }

      const client = new MongoClient(mongoUri);
      await client.connect();
      return client.db(getMongoDbName()).collection("site_data");
    })();
  }

  return mongoCollectionPromise;
}

async function seedMongo(collection) {
  const seed = await readFileDb();
  await collection.replaceOne({ _id: "main" }, { _id: "main", ...seed }, { upsert: true });
  return seed;
}

async function readDb() {
  const collection = await getMongoCollection();
  if (!collection) return readFileDb();

  const doc = await collection.findOne({ _id: "main" });
  return doc ? stripMongoId(doc) : seedMongo(collection);
}

async function writeDb(db) {
  const collection = await getMongoCollection();
  if (collection) {
    await collection.replaceOne({ _id: "main" }, { _id: "main", ...db }, { upsert: true });
    return;
  }

  await fs.writeFile(dbPath, JSON.stringify(db, null, 2) + "\n", "utf8");
}

async function updateDb(mutator) {
  const db = await readDb();
  const result = await mutator(db);
  await writeDb(db);
  return result;
}

module.exports = {
  readDb,
  updateDb,
};
