import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseCatalog from './pages/CourseCatalog';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
});

  // Optional: Load user from localStorage (if already logged in)
 useEffect(() => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  if (userId && token) {
    setUser({ _id: userId }); // enough to pass user
    localStorage.setItem('user', JSON.stringify(user));
  }
}, []);

  return (
    <Router>
       <Navbar user={user} setUser={setUser} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<CourseCatalog user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
