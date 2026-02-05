import Database from "better-sqlite3";

const db = new Database("alerts.db");

// Create table if not exists
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

export default db;
