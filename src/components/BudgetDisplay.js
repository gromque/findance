// src/components/BudgetDisplay.js

import React from 'react';
import budgetData from '../utils/budgetData';  // Adjust the import path as needed

const BudgetDisplay = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-purple-400">Budget Overview</h2>
      <p className="text-gray-300">Category: {budgetData.category}</p>
      <p className="text-gray-300">Total Budget: ${budgetData.amount}</p>
      <p className="text-gray-300">Amount Spent: ${budgetData.spent}</p>
      <p className="text-gray-300">Date: {budgetData.date.toLocaleDateString()}</p>
    </div>
  );
};

export default BudgetDisplay;
