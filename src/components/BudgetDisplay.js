import React, { useState, useEffect } from 'react'
import { Wallet, DollarSign, ShoppingCart, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'

const BudgetDisplay = () => {
  const [budgetData, setBudgetData] = useState({
    category: 'Groceries',
    amount: 500,
    spent: 350,
    date: new Date(),
  })

  const [updatedCategory, setUpdatedCategory] = useState(budgetData.category)
  const [updatedAmount, setUpdatedAmount] = useState(budgetData.amount)
  const [updatedSpent, setUpdatedSpent] = useState(budgetData.spent)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBudgetData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5001/api/budget')
        if (!response.ok) throw new Error('Failed to fetch budget data.')

        const data = await response.json()
        setBudgetData(data)
        setUpdatedCategory(data.category)
        setUpdatedAmount(data.budget_amount)
        setUpdatedSpent(data.spent || 0)
      } catch (error) {
        console.error('Error fetching budget data:', error)
        setError('Unable to fetch budget data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBudgetData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const updatedBudget = {
      category: updatedCategory,
      amount: updatedAmount,
      spent: updatedSpent,
    }

    try {
      const response = await fetch('http://localhost:5001/api/budget', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBudget),
      })

      if (!response.ok) throw new Error('Failed to update budget.')

      const updatedData = await response.json()
      setBudgetData(updatedData)
      setMessage('Budget updated successfully!')
      setError('')
    } catch (error) {
      console.error('Error updating budget:', error)
      setError('Unable to update budget.')
      setMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const percentageSpent = (budgetData.spent / budgetData.amount) * 100

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <Wallet className="h-8 w-8 text-purple-400 mr-2" />
        <h2 className="text-2xl font-bold text-purple-400">Budget Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Budget</h3>
          <p className="text-3xl font-bold text-purple-400">${budgetData.amount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Amount Spent</h3>
          <p className="text-3xl font-bold text-purple-400">${budgetData.spent.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Budget Progress</h3>
        <div className="w-full bg-gray-600 rounded-full h-4">
          <div
            className="bg-purple-600 h-4 rounded-full"
            style={{ width: `${percentageSpent}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Spent: {percentageSpent.toFixed(2)}%</span>
          <span>Remaining: {(100 - percentageSpent).toFixed(2)}%</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="category" className="text-gray-300">Category</label>
          <div className="relative">
            <ShoppingCart className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="category"
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
              className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 rounded-md w-full p-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="text-gray-300">Total Budget</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="amount"
              type="number"
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(parseFloat(e.target.value))}
              className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 rounded-md w-full p-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="spent" className="text-gray-300">Amount Spent</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="spent"
              type="number"
              value={updatedSpent}
              onChange={(e) => setUpdatedSpent(parseFloat(e.target.value))}
              className="pl-10 bg-gray-700 border border-gray-600 text-gray-100 rounded-md w-full p-2"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Budget'}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-4 bg-green-800 border border-green-600 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
          <p className="text-green-100">{message}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-800 border border-red-600 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-red-100">{error}</p>
        </div>
      )}

      <div className="mt-6 flex items-center text-gray-400">
        <Calendar className="mr-2 h-4 w-4" />
        <span>Last updated: {new Date(budgetData.date).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

export default BudgetDisplay