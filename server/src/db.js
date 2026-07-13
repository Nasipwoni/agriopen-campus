import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data.sqlite');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// A single learner role for now. When more account types arrive later,
// add a `role` column with a default and branch on it in the routes.
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL UNIQUE,
    password   TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS courses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        TEXT    NOT NULL UNIQUE,
    title       TEXT    NOT NULL,
    level       TEXT    NOT NULL,
    duration    TEXT    NOT NULL,
    summary     TEXT    NOT NULL,
    description TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    user_id     INTEGER NOT NULL REFERENCES users(id),
    course_id   INTEGER NOT NULL REFERENCES courses(id),
    enrolled_at TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, course_id)
  );
`);

export default db;
