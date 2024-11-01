'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, DollarSign, ArrowUpRight, Menu } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [budgetData, setBudgetData] = useState({
    total: 200,
    spent: 150,
    remaining: 50,
    cumulativeInvestments: 0,
  });

  const [investmentData, setInvestmentData] = useState({
    total: 0,
    growth: 0,
    performance: 0,
  });

  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Initialize performance data with some mock data
    const initialData = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500,
    }));
    setPerformanceData(initialData);
  }, []);

  const handleWeekEnd = () => {
    const remaining = budgetData.remaining;
    const newTotalInvestments = investmentData.total + remaining;
    const newGrowth = investmentData.growth + (remaining * 0.1);
    const newPerformance = newTotalInvestments > 0 ? (newGrowth / newTotalInvestments) * 100 : 0;

    setBudgetData(prevData => ({
      ...prevData,
      cumulativeInvestments: prevData.cumulativeInvestments + remaining,
      remaining: 0,
    }));
    
    setInvestmentData({
      total: newTotalInvestments,
      growth: newGrowth,
      performance: newPerformance,
    });

    // Update performance data
    setPerformanceData(prevData => [
      ...prevData.slice(1),
      { day: `Day ${prevData.length + 1}`, value: newTotalInvestments },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-purple-400 mr-2" />
          <h1 className="text-2xl font-bold text-purple-400">Findance</h1>
        </div>
        <button className="p-2 text-gray-100">
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Welcome back, Maha!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <h3 className="text-xl text-purple-300">Total Balance</h3>
            <p className="text-4xl font-bold">${budgetData.total + budgetData.cumulativeInvestments}</p>
            <p className="text-green-400 flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8% from last month
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <h3 className="text-xl text-purple-300">Automated Investments</h3>
            <p className="text-4xl font-bold">${budgetData.cumulativeInvestments}</p>
            <p className="text-gray-400 mt-2">Total invested so far</p>
          </div>
        </div>

        <div className="tabs space-y-4">
          <div className="bg-gray-800 text-gray-100 flex space-x-4">
            <button onClick={() => setActiveTab('overview')} className={`tab ${activeTab === 'overview' ? 'active' : ''}`}>
              Overview
            </button>
            <button onClick={() => setActiveTab('budget')} className={`tab ${activeTab === 'budget' ? 'active' : ''}`}>
              Budget
            </button>
            <button onClick={() => setActiveTab('investments')} className={`tab ${activeTab === 'investments' ? 'active' : ''}`}>
              Investments
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                <h3 className="text-xl">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('budget')} className="flex items-center justify-center h-24 bg-purple-600 hover:bg-purple-700 rounded-lg">
                    <PieChart className="h-8 w-8 mr-2" />
                    View Budget
                  </button>
                  <button onClick={() => setActiveTab('investments')} className="flex items-center justify-center h-24 bg-purple-600 hover:bg-purple-700 rounded-lg">
                    <DollarSign className="h-8 w-8 mr-2" />
                    Check Investments
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-4">
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                <h3 className="text-xl">Monthly Budget</h3>
                <p>Your spending overview</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Budget</span>
                    <span className="font-bold">${budgetData.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spent</span>
                    <span className="font-bold text-red-400">${budgetData.spent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining</span>
                    <span className="font-bold text-green-400">${budgetData.remaining}</span>
                  </div>
                </div>
                <div className="mt-4 bg-gray-700 h-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full" 
                    style={{ width: `${(budgetData.spent / budgetData.total) * 100}%` }}
                  ></div>
                </div>
                <button onClick={handleWeekEnd} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                  End Week and Invest Remaining Budget
                </button>
              </div>
            </div>
          )}

          {activeTab === 'investments' && (
            <div className="space-y-4">
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                <h3 className="text-xl">Investments Overview</h3>
                <p>Your investment performance this month</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Investments</span>
                    <span className="font-bold">${investmentData.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth</span>
                    <span className="font-bold text-green-400">${investmentData.growth.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance</span>
                    <span className="font-bold text-green-400">{investmentData.performance.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="mt-6 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <XAxis dataKey="day" stroke="#8884d8" />
                      <YAxis stroke="#8884d8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                        labelStyle={{ color: '#8884d8' }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}