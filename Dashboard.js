
import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { ExpenseContext } from "../contexts/ExpenseContext";
import ExpenseTable from "./ExpenseTable";


import { Line } from "react-chartjs-2";

const Dashboard = () => {
  const { expenses, loggedInUser, setLoggedInUser } = useContext(ExpenseContext);

  const handleLogout = () => {
    setLoggedInUser(null);  // This clears the logged-in user from context
  };

  // Ensure expenses is not null or undefined
  const validExpenses = expenses || [];

  // Chart.js Data
  const chartData = {
    labels: validExpenses.map((expense) => new Date(expense.date).toLocaleDateString()),
    datasets: [{
      label: 'Expense Amount',
      data: validExpenses.map((expense) => expense.amount),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <Container>
      <h1>Welcome, {loggedInUser?.email}</h1>
      <Button variant="secondary" onClick={handleLogout}>Logout</Button>

      <ExpenseTable />

      {/* Visualization (Line Chart) */}
      <h3>Expense Over Time</h3>
      {validExpenses.length > 0 ? <Line data={chartData} /> : <p>No expenses to display</p>}
    </Container>
  );
};

export default Dashboard;
