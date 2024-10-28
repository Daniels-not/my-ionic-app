import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import DashboardComponent from './components/DashboardComponent';
import ProfileComponent from './components/ProfileComponent';
import NavbarComponent from './components/NavbarComponent';
import DownloadsComponent from './components/DownloadsComponent';
import FAQComponent from './components/FAQComponent';
import FooterComponent from './components/subcomponents/FooterComponent';
import NewBugComponent from './components/NewBugComponent';

const App = () => {
  return (
    <>
    
    <Router className='bg-white'>
    <NavbarComponent />  
      <Routes>
        <Route path="/" element={<HomeComponent />} />
          <Route path="/downloads" element={<DownloadsComponent />} />
          <Route path="/faq" element={<FAQComponent />} />
          <Route path="/contact_faq" element={<NewBugComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/profile" component={<ProfileComponent />} />
      </Routes>
      <FooterComponent />
    </Router>
    </>
  );
};

export default App;
