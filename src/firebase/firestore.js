import { db } from "./firebase"; // Adjust the import based on your file structure
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Function to add a budget
export const addBudget = async (budgetData) => {
  try {
    const docRef = await addDoc(collection(db, "budgets"), {
      ...budgetData,
      createdAt: Timestamp.fromDate(new Date()), // Add timestamp
      updatedAt: Timestamp.fromDate(new Date()), // Add timestamp
    });
    console.log("Budget added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding budget: ", e);
  }
};
