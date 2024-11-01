// utils/budgetData.js

const budgetData = {
    category: "Groceries",
    amount: 200,
    spent: 150,
    date: new Date('2024-01-01'), // Example of a static date
};

// Optionally, you can create a function to retrieve or update budget data
export const getBudgetData = () => {
    return budgetData;
};

export default budgetData; // This export remains the same
