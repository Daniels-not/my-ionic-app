import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import DashboardComponent from './components/DashboardComponent';
import ProfileComponent from './components/ProfileComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/profile" component={<ProfileComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
