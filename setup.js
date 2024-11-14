const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database object
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  // Create Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating Users table: ' + err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  // Create Budgets table
  db.run(`CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating Budgets table: ' + err.message);
    } else {
      console.log('Budgets table created or already exists.');
    }
  });

  // Create Investments table
  db.run(`CREATE TABLE IF NOT EXISTS investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL NOT NULL,
    risk_profile TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`, (err) => {
    if (err) {
      console.error('Error creating Investments table: ' + err.message);
    } else {
      console.log('Investments table created or already exists.');
    }
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database connection: ' + err.message);
  } else {
    console.log('Database connection closed.');
  }
});
