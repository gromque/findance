import React, { useState, useEffect } from 'react';

const BudgetDisplay = () => {
  const [budgetData, setBudgetData] = useState({
    category: 'Groceries',
    amount: 500,
    spent: 350,
    date: new Date(),
  });

  const [updatedAmount, setUpdatedAmount] = useState(budgetData.amount);
  const [updatedSpent, setUpdatedSpent] = useState(budgetData.spent);

  // Fetch budget data from the server (mocked for now)
  useEffect(() => {
    const fetchBudgetData = async () => {
      const response = await fetch('http://localhost:5001/api/budget'); // Update URL if needed
      const data = await response.json();
      setBudgetData(data);
      setUpdatedAmount(data.amount);
      setUpdatedSpent(data.spent);
    };

    fetchBudgetData();
  }, []);

  // Handle form submission to update budget data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated data to be sent to the server
    const updatedBudget = {
      category: budgetData.category,  // Keep the category the same
      amount: updatedAmount,
      spent: updatedSpent,
    };

    // Send PUT request to update the budget data
    try {
      const response = await fetch('http://localhost:5001/api/budget', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBudget),
      });

      const updatedData = await response.json();
      setBudgetData(updatedData);  // Update the state with the new budget data
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-purple-400">Budget Overview</h2>
      <p className="text-gray-300">Category: {budgetData.category}</p>
      
      {/* Form for editing budget */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="amount" className="text-gray-300">Total Budget:</label>
          <input
            id="amount"
            type="number"
            value={updatedAmount}
            onChange={(e) => setUpdatedAmount(e.target.value)}
            className="p-2 rounded"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="spent" className="text-gray-300">Amount Spent:</label>
          <input
            id="spent"
            type="number"
            value={updatedSpent}
            onChange={(e) => setUpdatedSpent(e.target.value)}
            className="p-2 rounded"
          />
        </div>
        
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 px-4 rounded mt-4"
        >
          Update Budget
        </button>
      </form>
      
      <p className="text-gray-300">Date: {budgetData.date.toLocaleDateString()}</p>
    </div>
  );
};

export default BudgetDisplay;
