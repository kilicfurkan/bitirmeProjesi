import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from '../components/Menu';
import Reservation from '../components/Reservation';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
            </div>
    )
}
