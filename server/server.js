// Importing necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for front-end to access API
app.use(bodyParser.json()); // To parse JSON request bodies

// Sample mock budget data
let budgetData = {
  category: 'Groceries',
  amount: 500,
  spent: 350,
  date: new Date(),
};

// GET route to fetch budget data
app.get('/api/budget', (req, res) => {
  // Respond with the current budget data
  res.json(budgetData);
});

// PUT route to update the budget data
app.put('/api/budget', (req, res) => {
  // Get updated data from the request body
  const { category, amount, spent } = req.body;

  // Update the mock budget data (you can replace this with database updates later)
  budgetData = { category, amount, spent, date: new Date() };

  // Send the updated budget data as a response
  res.json(budgetData);
});

// Setting up the server to listen on a specified port
const PORT = process.env.PORT || 5001; // Default to port 5001 if not specified
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
