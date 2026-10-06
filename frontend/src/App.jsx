import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { isLoggedIn } from './utils/auth';
import Navigation from './component/Navigation';
import Analysis from './pages/Anaysis';
function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        {/* <Navigation loggedIn={loggedIn} onLogout={handleLogout} /> */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/analysis" element={loggedIn ? <Analysis onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;