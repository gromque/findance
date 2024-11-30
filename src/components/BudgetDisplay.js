import React, { useState, useEffect } from 'react';

const BudgetDisplay = () => {
  const [budgetData, setBudgetData] = useState({
    category: 'Groceries',
    amount: 500,
    spent: 350,
    date: new Date(),
  });

  const [updatedCategory, setUpdatedCategory] = useState(budgetData.category);
  const [updatedAmount, setUpdatedAmount] = useState(budgetData.amount);
  const [updatedSpent, setUpdatedSpent] = useState(budgetData.spent);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch budget data from the server
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/budget'); // Update URL if needed
        if (!response.ok) throw new Error('Failed to fetch budget data.');

        const data = await response.json();
        setBudgetData(data);
        setUpdatedCategory(data.category);
        setUpdatedAmount(data.budget_amount); // Ensure matching database field names
        setUpdatedSpent(data.spent || 0); // Use default value if `spent` is missing
      } catch (error) {
        console.error('Error fetching budget data:', error);
        setError('Unable to fetch budget data.');
      }
    };

    fetchBudgetData();
  }, []);

  // Handle form submission to update budget data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated data to be sent to the server
    const updatedBudget = {
      category: updatedCategory,
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

      if (!response.ok) throw new Error('Failed to update budget.');

      const updatedData = await response.json();
      setBudgetData(updatedData); // Update the state with the new budget data
      setMessage('Budget updated successfully!');
      setError('');
    } catch (error) {
      console.error('Error updating budget:', error);
      setError('Unable to update budget.');
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-purple-400">Budget Overview</h2>

      {/* Success or Error Messages */}
      {message && <p className="text-green-400">{message}</p>}
      {error && <p className="text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div className="flex items-center space-x-2">
          <label htmlFor="category" className="text-gray-300">Category:</label>
          <input
            id="category"
            type="text"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className="p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>

        {/* Total Budget */}
        <div className="flex items-center space-x-2">
          <label htmlFor="amount" className="text-gray-300">Total Budget:</label>
          <input
            id="amount"
            type="number"
            value={updatedAmount}
            onChange={(e) => setUpdatedAmount(parseFloat(e.target.value))}
            className="p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>

        {/* Amount Spent */}
        <div className="flex items-center space-x-2">
          <label htmlFor="spent" className="text-gray-300">Amount Spent:</label>
          <input
            id="spent"
            type="number"
            value={updatedSpent}
            onChange={(e) => setUpdatedSpent(parseFloat(e.target.value))}
            className="p-2 rounded bg-gray-700 text-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mt-4"
        >
          Update Budget
        </button>
      </form>

      {/* Display Budget Date */}
      <p className="text-gray-300">
        Date: {new Date(budgetData.start_date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BudgetDisplay;
