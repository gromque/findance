'use client'

import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowUpRight, Menu } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
  const [budgetData, setBudgetData] = useState({
    total: 10000,
    spent: 3000,
    remaining: 7000,
    cumulativeInvestments: 2000,
  });

  const [investmentData, setInvestmentData] = useState({
    total: 2000,
    growth: 100,
    performance: 5,
  });

  const [chartData, setChartData] = useState([
    { name: 'Week 1', value: 2000 },
    { name: 'Week 2', value: 2100 },
    { name: 'Week 3', value: 2200 },
    { name: 'Week 4', value: 2300 },
  ]);

  useEffect(() => {
    setBudgetData({
      ...budgetData,
      remaining: budgetData.total - budgetData.spent,
    });
  }, [budgetData.total, budgetData.spent]);

  const handleBudgetChange = (e) => {
    const newTotalBudget = parseFloat(e.target.value);
    setBudgetData({
      ...budgetData,
      total: newTotalBudget,
    });
  };

  const handleSpentChange = (e) => {
    const newSpentAmount = parseFloat(e.target.value);
    setBudgetData({
      ...budgetData,
      spent: newSpentAmount,
    });
  };

  const handleInvest = (e) => {
    const investmentAmount = parseFloat(e.target.value);
    setInvestmentData({
      ...investmentData,
      total: investmentData.total + investmentAmount,
      growth: investmentData.growth + investmentAmount * 0.05,
      performance: (investmentData.growth / investmentData.total) * 100,
    });
  };

  const handleWeekEnd = () => {
    const remaining = budgetData.remaining;
    const newTotalInvestments = investmentData.total + remaining;
    const newGrowth = investmentData.growth + remaining * 0.1;
    const newPerformance = newTotalInvestments > 0 ? (newGrowth / newTotalInvestments) * 100 : 0;

    setBudgetData({
      ...budgetData,
      cumulativeInvestments: budgetData.cumulativeInvestments + remaining,
      remaining: 0,
    });

    setInvestmentData({
      total: newTotalInvestments,
      growth: newGrowth,
      performance: newPerformance,
    });

    // Update chart data
    setChartData(prevData => [
      ...prevData,
      { name: `Week ${prevData.length + 1}`, value: newTotalInvestments }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-purple-400 mr-2" />
          <h1 className="text-2xl font-bold text-purple-400">Findance</h1>
        </div>
        <button className="bg-transparent border-0 text-purple-400 p-2">
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        <h2 className="text-3xl font-bold mb-6">Welcome back, Alex!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold">Total Balance</h3>
            <p className="text-4xl font-bold text-white">${budgetData.total + budgetData.cumulativeInvestments}</p>
            <p className="text-green-400 flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8% from last month
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold">Automated Investments</h3>
            <p className="text-4xl font-bold text-white">${budgetData.cumulativeInvestments}</p>
            <p className="text-gray-400 mt-2">Total invested so far</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-white text-lg font-bold">Update Your Budget</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Total Budget</label>
              <input
                type="number"
                placeholder="Enter total budget"
                value={budgetData.total}
                onChange={handleBudgetChange}
                className="mt-1 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Spent Amount</label>
              <input
                type="number"
                placeholder="Enter spent amount"
                value={budgetData.spent}
                onChange={handleSpentChange}
                className="mt-1 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 p-2 rounded w-full"
              />
            </div>
            <button
              onClick={() => setBudgetData({ ...budgetData, remaining: budgetData.total - budgetData.spent })}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
            >
              Update Remaining Budget
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-white text-lg font-bold">Invest More</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Investment Amount</label>
              <input
                type="number"
                placeholder="Enter investment amount"
                onChange={handleInvest}
                className="mt-1 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 p-2 rounded w-full"
              />
            </div>
            <button
              onClick={handleWeekEnd}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
            >
              End Week & Invest Remaining Budget
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold">Budget Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white">Total Budget</span>
                <span className="font-bold text-white">${budgetData.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Spent</span>
                <span className="font-bold text-red-400">${budgetData.spent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Remaining</span>
                <span className="font-bold text-green-400">${budgetData.remaining}</span>
              </div>
              <div className="bg-gray-600 h-2 rounded">
                <div
                  className="bg-purple-900 h-full rounded"
                  style={{ width: `${(budgetData.spent / budgetData.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold">Investment Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white">Total Investments</span>
                <span className="font-bold text-white">${investmentData.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Growth</span>
                <span className="font-bold text-green-400">${investmentData.growth.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Performance</span>
                <span className="font-bold text-green-400">{investmentData.performance.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-700 p-4 rounded-lg shadow-lg">
          <h3 className="text-white text-lg font-bold mb-4">Investment Growth Chart</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;