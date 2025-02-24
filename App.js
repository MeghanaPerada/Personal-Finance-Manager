import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import ExpenseProvider, { ExpenseContext } from "./contexts/ExpenseContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Avatar from "./components/Avatar";
import AIAssistant from "./components/AIAssistant";
import ExpenseForm from "./components/ExpenseForm";

// App Component
function App() {
  // Using ExpenseContext
  const { loggedInUser, setLoggedInUser } = useContext(ExpenseContext);

  // State for showing authentication forms
  const [showAuthForm, setShowAuthForm] = useState(true);

  // Effect to hide auth forms when logged in
  useEffect(() => {
    if (loggedInUser) {
      setShowAuthForm(false); // Hide the auth forms if logged in
    } else {
      setShowAuthForm(true);  // Show auth forms if not logged in
    }
  }, [loggedInUser]);

  // Handle successful login and registration
  const onLoginSuccess = (user) => {
    setLoggedInUser(user); // Set the loggedInUser state after login
    setShowAuthForm(false); // Hide auth forms after login
  };

  const onRegisterSuccess = (user) => {
    setLoggedInUser(user); // Set the loggedInUser state after registration
    setShowAuthForm(false); // Hide auth forms after registration
  };

  // Handle logout
  const onLogout = () => {
    setLoggedInUser(null); // Clear the loggedInUser state
    setShowAuthForm(true);  // Show auth form again after logout
  };

  return (
    <ExpenseProvider>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Expense Management</Navbar.Brand>
            <Nav className="ml-auto">
              {loggedInUser ? (
                <>
                  <Nav.Link as={Link} to="/" onClick={onLogout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/ai">AI Assistant</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-5">
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<Register onRegisterSuccess={onRegisterSuccess} />} />

            <Route path="/" element={loggedInUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={loggedInUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/ai" element={loggedInUser ? <AIAssistant /> : <Navigate to="/login" />} />
            <Route path="/add-expense" element={loggedInUser ? <ExpenseForm /> : <Navigate to="/login" />} />
            <Route path="/avatar" element={loggedInUser ? <Avatar user={loggedInUser} onAvatarChange={(newAvatar) => setLoggedInUser({ ...loggedInUser, avatar: newAvatar })} /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
