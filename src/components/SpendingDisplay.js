'use client'

import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, Tag, FileText, PlusCircle, TrendingDown } from 'lucide-react'

const SpendingDisplay = () => {
  const [spending, setSpending] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [newSpending, setNewSpending] = useState({
    user_id: 1,
    amount: '',
    category: '',
    spend_date: new Date().toISOString().slice(0, 10),
    description: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchSpending()
  }, [])

  const fetchSpending = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/spending?page=1&limit=100')
      if (!response.ok) throw new Error('Failed to fetch spending records.')

      const data = await response.json()
      setSpending(data)

      const categoryTotals = {}
      data.forEach((item) => {
        if (categoryTotals[item.category]) {
          categoryTotals[item.category] += item.amount
        } else {
          categoryTotals[item.category] = item.amount
        }
      })

      const chartData = Object.entries(categoryTotals).map(([key, value]) => ({
        name: key,
        value: parseFloat(value.toFixed(2)),
      }))
      setCategoryData(chartData)
    } catch (error) {
      console.error('Error fetching spending records:', error)
      setError('Unable to fetch spending records.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5001/api/spending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSpending),
      })

      if (!response.ok) throw new Error('Failed to add spending record.')

      const result = await response.json()
      setSpending([...spending, { ...newSpending, id: result.id }])
      setMessage('Spending record added successfully!')
      setError('')
      setNewSpending({
        user_id: 1,
        amount: '',
        category: '',
        spend_date: new Date().toISOString().slice(0, 10),
        description: '',
      })
      fetchSpending() // Refresh data
    } catch (error) {
      console.error('Error adding spending record:', error)
      setError('Unable to add spending record.')
      setMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const COLORS = ['#8B5CF6', '#4ADE80', '#FACC15', '#F87171', '#60A5FA']

  return (
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center">
          <TrendingDown className="mr-2" />
          Spending Overview
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Add New Spending</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-300 block mb-1">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={newSpending.amount}
                    onChange={(e) => setNewSpending({ ...newSpending, amount: parseFloat(e.target.value) })}
                    className="pl-10 p-2 rounded bg-gray-700 text-gray-100 w-full border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={newSpending.category}
                    onChange={(e) => setNewSpending({ ...newSpending, category: e.target.value })}
                    className="pl-10 p-2 rounded bg-gray-700 text-gray-100 w-full border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={newSpending.spend_date}
                    onChange={(e) => setNewSpending({ ...newSpending, spend_date: e.target.value })}
                    className="pl-10 p-2 rounded bg-gray-700 text-gray-100 w-full border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Description</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={newSpending.description}
                    onChange={(e) => setNewSpending({ ...newSpending, description: e.target.value })}
                    className="pl-10 p-2 rounded bg-gray-700 text-gray-100 w-full border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full flex items-center justify-center transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                ) : (
                  <PlusCircle className="mr-2" />
                )}
                {isLoading ? 'Adding...' : 'Add Spending'}
              </button>
            </form>

            {message && <p className="text-green-400 mt-4">{message}</p>}
            {error && <p className="text-red-400 mt-4">{error}</p>}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Spending by Category</h3>
            <div className="bg-gray-700 p-4 rounded-lg shadow-inner h-[400px]">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                      formatter={(value) => [`$${value}`, 'Amount']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-300 text-center mt-20">No category data available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Recent Spending Records</h3>
          {spending.length > 0 ? (
            <div className="bg-gray-700 rounded-lg shadow-inner overflow-hidden">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-600">
                  {spending.slice(0, 5).map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(item.spend_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${item.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.description}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-300">No spending records found.</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default SpendingDisplay