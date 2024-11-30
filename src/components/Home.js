'use client';

import React, { useState } from 'react';
import BudgetDisplay from './BudgetDisplay';
import InvestmentDisplay from './InvestmentDisplay';
import SpendingDisplay from './SpendingDisplay';
import { Menu, TrendingUp } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Budget'); // Manage active tab

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Budget':
        return <BudgetDisplay />;
      case 'Spending':
        return <SpendingDisplay />;
      case 'Investments':
        return <InvestmentDisplay />;
      default:
        return <BudgetDisplay />;
    }
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

      <nav className="bg-gray-800 p-4 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Budget' ? 'bg-purple-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('Budget')}
        >
          Budget
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Spending' ? 'bg-purple-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('Spending')}
        >
          Spending
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Investments' ? 'bg-purple-600' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('Investments')}
        >
          Investments
        </button>
      </nav>

      <main className="container mx-auto p-6">
        {renderActiveTab()} {/* Render the active tab component */}
      </main>
    </div>
  );
};

export default Home;
