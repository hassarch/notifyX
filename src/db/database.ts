import Database from "better-sqlite3";

const db = new Database("alerts.db");

// Create table if it does not exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    name TEXT,
    trigger TEXT,
    channels TEXT,
    message TEXT,
    recipients TEXT,
    createdAt TEXT
  )
`).run();

// ADD schedule column if missing (SAFE MIGRATION)
try {
  db.prepare(`ALTER TABLE alerts ADD COLUMN schedule TEXT`).run();
  console.log("schedule column added to alerts table");
} catch {
  // Column already exists → ignore
}

export default db;
