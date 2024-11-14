const db = require('../config');

const User = {
  createUser: (userData) => {
    const { name, email, password } = userData;
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...userData });
        }
      });
    });
  },
  // Add other user-related methods here (e.g., findUser, updateUser)
};

module.exports = User;
