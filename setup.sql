-- Enable foreign key enforcement
PRAGMA foreign_keys = ON;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Budgets;
DROP TABLE IF EXISTS SpendingRecords;
DROP TABLE IF EXISTS Investments;

-- Create the Users table
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT (DATETIME('now')) -- Automatically set to current timestamp
);

-- Create the Budgets table
CREATE TABLE Budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    budget_amount REAL NOT NULL,
    category TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')), -- Timestamp for when the record is created
    updated_at TEXT DEFAULT (DATETIME('now')), -- Timestamp for when the record is last updated
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the SpendingRecords table
CREATE TABLE SpendingRecords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    spend_date TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT (DATETIME('now')), -- Timestamp for when the record is created
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the Investments table
CREATE TABLE Investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    investment_amount REAL NOT NULL,
    investment_type TEXT NOT NULL CHECK (investment_type IN ('Safe', 'Medium Risk', 'High Risk')), -- Restrict values to predefined risk types
    growth_rate REAL DEFAULT 0, -- Store calculated growth rate based on risk type
    start_date TEXT NOT NULL,
    end_date TEXT,
    created_at TEXT DEFAULT (DATETIME('now')), -- Timestamp for when the record is created
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON Budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_spending_user_id ON SpendingRecords(user_id);
CREATE INDEX IF NOT EXISTS idx_investments_user_id ON Investments(user_id);
