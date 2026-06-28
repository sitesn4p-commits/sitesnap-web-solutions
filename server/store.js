const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "data", "db.json");

async function readDb() {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

async function writeDb(db) {
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
