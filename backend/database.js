import Database from "better-sqlite3";

const db = new Database("users.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  credits INTEGER DEFAULT 50
)
`).run();

export default db;