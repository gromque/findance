const db = require('../config');

const Investment = {
  createInvestment: (investmentData) => {
    const { userId, amount, riskProfile } = investmentData;
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO investments (user_id, amount, risk_profile) VALUES (?, ?, ?)`, [userId, amount, riskProfile], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...investmentData });
        }
      });
    });
  },
  // Add other investment-related methods here
};

module.exports = Investment;
