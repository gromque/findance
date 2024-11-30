import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InvestmentDisplay = () => {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    user_id: 1, // Replace with dynamic user logic if needed
    investment_amount: '',
    investment_type: 'Safe',
    start_date: new Date().toISOString().slice(0, 10),
  });
  const [projectedData, setProjectedData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch investments from the server
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/investments?page=1&limit=10');
        if (!response.ok) throw new Error('Failed to fetch investments.');

        const data = await response.json();
        setInvestments(data);

        // Generate projected investment data
        if (data.length > 0) {
          const lastInvestment = data[data.length - 1];
          const growthRate =
            lastInvestment.investment_type === 'Safe'
              ? 0.02
              : lastInvestment.investment_type === 'Medium Risk'
              ? 0.05
              : 0.1;

          const projections = [];
          let amount = lastInvestment.investment_amount;

          for (let i = 1; i <= 5; i++) {
            amount = amount * (1 + growthRate);
            projections.push({ year: `Year ${i}`, projectedValue: parseFloat(amount.toFixed(2)) });
          }

          setProjectedData(projections);
        }
      } catch (error) {
        console.error('Error fetching investments:', error);
        setError('Unable to fetch investments.');
      }
    };

    fetchInvestments();
  }, []);

  // Handle form submission for adding a new investment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvestment),
      });

      if (!response.ok) throw new Error('Failed to add investment.');

      const result = await response.json();
      setInvestments([...investments, { ...newInvestment, id: result.id }]);
      setMessage('Investment added successfully!');
      setError('');
    } catch (error) {
      console.error('Error adding investment:', error);
      setError('Unable to add investment.');
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-purple-400">Investment Overview</h2>

      {message && <p className="text-green-400">{message}</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Form for adding investments */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-300">Amount</label>
          <input
            type="number"
            value={newInvestment.investment_amount}
            onChange={(e) => setNewInvestment({ ...newInvestment, investment_amount: parseFloat(e.target.value) })}
            className="p-2 rounded bg-gray-700 text-gray-100 w-full"
          />
        </div>

        <div>
          <label className="text-gray-300">Type</label>
          <select
            value={newInvestment.investment_type}
            onChange={(e) => setNewInvestment({ ...newInvestment, investment_type: e.target.value })}
            className="p-2 rounded bg-gray-700 text-gray-100 w-full"
          >
            <option value="Safe">Safe</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mt-4"
        >
          Add Investment
        </button>
      </form>

      {/* Displaying existing investments */}
      <h3 className="text-lg font-bold text-gray-300 mt-6">Investments</h3>
      {investments.length > 0 ? (
        <ul className="space-y-2">
          {investments.map((investment) => (
            <li key={investment.id} className="text-gray-300">
              ${investment.investment_amount} ({investment.investment_type}) - {investment.start_date}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No investments recorded yet.</p>
      )}

      {/* Line chart for projected investment growth */}
      <h3 className="text-lg font-bold text-gray-300 mt-6">Projected Investment Growth</h3>
      {projectedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projectedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="year" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
            <Line type="monotone" dataKey="projectedValue" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-300">No projection data available.</p>
      )}
    </div>
  );
};

export default InvestmentDisplay;
