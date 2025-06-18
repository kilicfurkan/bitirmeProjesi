import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from '../components/Menu';
import Reservation from '../components/Reservation';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';
import About from '../components/About';
import Contact from '../components/Contact';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </>
  );
};

export default Dashboard;