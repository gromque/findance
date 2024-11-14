const db = require('../config');

const Budget = {
  createBudget: (budgetData) => {
    const { userId, amount, category } = budgetData;
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO budgets (user_id, amount, category) VALUES (?, ?, ?)`, [userId, amount, category], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...budgetData });
        }
      });
    });
  },
  // Add other budget-related methods here
};

module.exports = Budget;
