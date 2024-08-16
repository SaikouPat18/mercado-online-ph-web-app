import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import VendorHome from './pages/VendorHome';
import AddPassword from './pages/AddPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/home" element={<UserHome />} /> {/* Route for user home */}
        <Route path="/vendor/home" element={<VendorHome />} /> {/* Route for vendor home */}
        <Route path="/add-password" element={<AddPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
