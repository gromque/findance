import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingDisplay = () => {
  const [spending, setSpending] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [newSpending, setNewSpending] = useState({
    user_id: 1,
    amount: '',
    category: '',
    spend_date: new Date().toISOString().slice(0, 10),
    description: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch spending data from the server
  useEffect(() => {
    const fetchSpending = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/spending?page=1&limit=100');
        if (!response.ok) throw new Error('Failed to fetch spending records.');

        const data = await response.json();
        setSpending(data);

        // Aggregate spending by category
        const categoryTotals = {};
        data.forEach((item) => {
          if (categoryTotals[item.category]) {
            categoryTotals[item.category] += item.amount;
          } else {
            categoryTotals[item.category] = item.amount;
          }
        });

        // Convert to array format for Recharts
        const chartData = Object.entries(categoryTotals).map(([key, value]) => ({
          name: key,
          value: parseFloat(value.toFixed(2)),
        }));
        setCategoryData(chartData);
      } catch (error) {
        console.error('Error fetching spending records:', error);
        setError('Unable to fetch spending records.');
      }
    };

    fetchSpending();
  }, []);

  // Handle form submission for adding a new spending record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/spending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpending),
      });

      if (!response.ok) throw new Error('Failed to add spending record.');

      const result = await response.json();
      setSpending([...spending, { ...newSpending, id: result.id }]);
      setMessage('Spending record added successfully!');
      setError('');
    } catch (error) {
      console.error('Error adding spending record:', error);
      setError('Unable to add spending record.');
      setMessage('');
    }
  };

  const COLORS = ['#8B5CF6', '#4ADE80', '#FACC15', '#F87171', '#60A5FA']; // Custom colors for pie chart

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-purple-400">Spending Overview</h2>

      {message && <p className="text-green-400">{message}</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Form for adding spending records */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-300">Amount</label>
          <input
            type="number"
            value={newSpending.amount}
            onChange={(e) => setNewSpending({ ...newSpending, amount: parseFloat(e.target.value) })}
            className="p-2 rounded bg-gray-700 text-gray-100 w-full"
          />
        </div>

        <div>
          <label className="text-gray-300">Category</label>
          <input
            type="text"
            value={newSpending.category}
            onChange={(e) => setNewSpending({ ...newSpending, category: e.target.value })}
            className="p-2 rounded bg-gray-700 text-gray-100 w-full"
          />
        </div>

        <div>
          <label className="text-gray-300">Date</label>
          <input
            type="date"
            value={newSpending.spend_date}
            onChange={(e) => setNewSpending({ ...newSpending, spend_date: e.target.value })}
            className="p-2 rounded bg-gray-700 text-gray-100 w-full"
          />
        </div>

        <div>
          <label className="text-gray-300">Description</label>
          <input
            type="text"
            value={newSpending.description}
            onChange={(e) => setNewSpending({ ...newSpending, description: e.target.value })}
            className="p-2 rounded bg-gray-700 text-gray-100 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mt-4"
        >
          Add Spending
        </button>
      </form>

      {/* Layout for Spending Records and Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Spending Records */}
        <div>
          <h3 className="text-lg font-bold text-gray-300">Spending Records</h3>
          {spending.length > 0 ? (
            <ul className="space-y-2">
              {spending.map((item) => (
                <li key={item.id} className="text-gray-300">
                  {item.amount} ({item.category}) - {item.spend_date} - {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No spending records found.</p>
          )}
        </div>

        {/* Pie Chart for Spending by Category */}
        <div className="flex justify-center items-center">
          <div className="w-full h-[400px]">
            <h3 className="text-lg font-bold text-gray-300 mb-4">Spending by Category</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-300">No category data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingDisplay;