// Importing necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Initialize the app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for front-end to access API
app.use(bodyParser.json()); // To parse JSON request bodies

// Connect to SQLite database
const db = new sqlite3.Database('C:/Users/haitp/OneDrive/back up/project/findance/database.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// GET route to fetch budget data
app.get('/api/budget', (req, res) => {
    db.get('SELECT * FROM Budgets WHERE user_id = ?', [1], (err, row) => { // Replace 1 with dynamic user_id if needed
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row || { message: 'No budget found for this user.' });
        }
    });
});

// PUT route to update the budget data
app.put('/api/budget', (req, res) => {
    const { category, amount, spent } = req.body;
    const userId = 1; // Replace with dynamic user_id if needed

    db.run(
        'UPDATE Budgets SET category = ?, budget_amount = ?, start_date = ?, end_date = ? WHERE user_id = ?',
        [category, amount, new Date(), null, userId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'Budget updated successfully.' });
            }
        }
    );
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// GET Spending Records
app.get('/api/spending', (req, res) => {
  const userId = 1; // Replace with dynamic user_id
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;
  db.all(
      'SELECT * FROM SpendingRecords WHERE user_id = ? LIMIT ? OFFSET ?',
      [userId, parseInt(limit), parseInt(offset)],
      (err, rows) => {
          if (err) {
              res.status(500).json({ error: err.message });
          } else {
              res.json(rows);
          }
      }
  );
});


app.post('/api/spending', (req, res) => {
  const { user_id, amount, category, spend_date, description } = req.body;

  // Validate required fields
  if (!user_id || !amount || !category || !spend_date) {
      return res.status(400).json({ error: 'All fields (user_id, amount, category, spend_date) are required.' });
  }

  // Validate amount
  if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than zero.' });
  }

  // Validate date
  if (isNaN(new Date(spend_date).getTime())) {
      return res.status(400).json({ error: 'Invalid spend_date format. Use YYYY-MM-DD.' });
  }

  // Insert the spending record
  db.run(
      'INSERT INTO SpendingRecords (user_id, amount, category, spend_date, description) VALUES (?, ?, ?, ?, ?)',
      [user_id, amount, category, spend_date, description || ''],
      function (err) {
          if (err) {
              res.status(500).json({ error: err.message });
          } else {
              res.json({ id: this.lastID, message: 'Spending record added successfully.' });
          }
      }
  );
});


// GET Investments
app.get('/api/investments', (req, res) => {
  const userId = 1; // Replace with dynamic user_id
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;
  db.all(
      'SELECT * FROM Investments WHERE user_id = ? LIMIT ? OFFSET ?',
      [userId, parseInt(limit), parseInt(offset)],
      (err, rows) => {
          if (err) {
              res.status(500).json({ error: err.message });
          } else {
              res.json(rows);
          }
      }
  );
});


// POST New Investment
app.post('/api/investments', (req, res) => {
  const { user_id, investment_amount, investment_type, start_date } = req.body;

  // Validate required fields
  if (!user_id || !investment_amount || !investment_type || !start_date) {
      return res.status(400).json({ error: 'All fields (user_id, investment_amount, investment_type, start_date) are required.' });
  }

  // Validate investment amount
  if (investment_amount <= 0) {
      return res.status(400).json({ error: 'Investment amount must be greater than zero.' });
  }

  // Validate investment type
  if (!['Safe', 'Medium Risk', 'High Risk'].includes(investment_type)) {
      return res.status(400).json({ error: 'Invalid investment type. Use "Safe", "Medium Risk", or "High Risk".' });
  }

  // Validate date
  if (isNaN(new Date(start_date).getTime())) {
      return res.status(400).json({ error: 'Invalid start_date format. Use YYYY-MM-DD.' });
  }

  // Calculate growth and insert the investment
  const growthRate = investment_type === 'Safe' ? 0.02 : investment_type === 'Medium Risk' ? 0.05 : 0.1;
  const growth = investment_amount * (1 + growthRate);

  db.run(
      'INSERT INTO Investments (user_id, investment_amount, investment_type, start_date) VALUES (?, ?, ?, ?)',
      [user_id, investment_amount, investment_type, start_date],
      function (err) {
          if (err) {
              res.status(500).json({ error: err.message });
          } else {
              res.json({ id: this.lastID, growth, message: 'Investment added successfully.' });
          }
      }
  );
});


// Global error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.stack}`);
  res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
  });
});
