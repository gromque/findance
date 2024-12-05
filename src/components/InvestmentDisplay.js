import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InvestmentDisplay = () => {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    user_id: 1,
    investment_amount: '',
    investment_type: 'Safe',
    start_date: new Date().toISOString().slice(0, 10),
  });
  const [projectedData, setProjectedData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/investments?page=1&limit=10');
      if (!response.ok) throw new Error('Failed to fetch investments.');

      const data = await response.json();
      setInvestments(data);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setNewInvestment({
        user_id: 1,
        investment_amount: '',
        investment_type: 'Safe',
        start_date: new Date().toISOString().slice(0, 10),
      });
      fetchInvestments();
    } catch (error) {
      console.error('Error adding investment:', error);
      setError('Unable to add investment.');
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Investment Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Add New Investment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Amount</label>
              <input
                type="number"
                value={newInvestment.investment_amount}
                onChange={(e) => setNewInvestment({ ...newInvestment, investment_amount: parseFloat(e.target.value) })}
                className="w-full p-2 bg-gray-700 border border-gray-700 rounded text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Type</label>
              <select
                value={newInvestment.investment_type}
                onChange={(e) => setNewInvestment({ ...newInvestment, investment_type: e.target.value })}
                className="w-full p-2 bg-gray-700 border border-gray-700 rounded text-gray-100"
              >
                <option value="Safe">Safe</option>
                <option value="Medium Risk">Medium Risk</option>
                <option value="High Risk">High Risk</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={newInvestment.start_date}
                onChange={(e) => setNewInvestment({ ...newInvestment, start_date: e.target.value })}
                className="w-full p-2 bg-gray-700 border border-gray-700 rounded text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Investment'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Current Investments</h3>
          {investments.length > 0 ? (
            <ul className="space-y-2">
              {investments.map((investment) => (
                <li key={investment.id} className="bg-gray-700 p-3 rounded">
                  <span className="font-semibold">${investment.investment_amount.toLocaleString()}</span>
                  <span className="mx-2">-</span>
                  <span className="text-purple-400">{investment.investment_type}</span>
                  <span className="mx-2">-</span>
                  <span className="text-gray-400">{new Date(investment.start_date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No investments recorded yet.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-300 mb-4">Projected Investment Growth</h3>
        {projectedData.length > 0 ? (
          <div className="bg-gray-700 p-4 rounded">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Line type="monotone" dataKey="projectedValue" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-400">No projection data available.</p>
        )}
      </div>

      {message && <p className="mt-4 text-green-400">{message}</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}
    </div>
  );
};

export default InvestmentDisplay;