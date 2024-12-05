'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Menu, DollarSign, PieChart, BarChart2, User, Bell, Settings } from 'lucide-react';
import BudgetDisplay from './BudgetDisplay';
import InvestmentDisplay from './InvestmentDisplay';
import SpendingDisplay from './SpendingDisplay';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Budget');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

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

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <motion.div 
          className="flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TrendingUp className="h-8 w-8 text-purple-400 mr-2" />
          <h1 className="text-2xl font-bold text-purple-400">Findance</h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.button
            className="bg-transparent border-0 text-purple-400 p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="h-6 w-6" />
          </motion.button>
          <motion.button
            className="bg-transparent border-0 text-purple-400 p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </header>

      <div className="flex">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="bg-gray-800 w-64 h-screen fixed top-0 left-0 shadow-lg pt-20"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ul className="space-y-4 p-4">
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>

        <main className="flex-grow p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-4xl font-bold text-purple-400 mb-2">{greeting}, Alex!</h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl text-gray-300"
            >
              Welcome back to your financial dashboard
            </motion.p>
          </motion.div>

          <nav className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <ul className="flex justify-center space-x-4">
              {['Budget', 'Spending', 'Investments'].map((tab) => (
                <motion.li key={tab} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    className={`px-4 py-2 rounded-full flex items-center ${
                      activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'Budget' && <DollarSign className="h-5 w-5 mr-2" />}
                    {tab === 'Spending' && <PieChart className="h-5 w-5 mr-2" />}
                    {tab === 'Investments' && <BarChart2 className="h-5 w-5 mr-2" />}
                    {tab}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            {renderActiveTab()}
          </motion.div>
        </main>
      </div>

      <footer className="bg-gray-800 text-center p-4 mt-8">
        <p className="text-gray-400">&copy; 2024 Findance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;