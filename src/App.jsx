import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Firebase authentication

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
import BookTrip from './pages/BookTrip';
import MyTrips from './pages/MyTrips';
import PaymentForm from './components/PaymentForm';


// import BarcodeScannerPage from "./pages/BarcodeScannerPage.jsx";

const App = () => {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth(); // Firebase auth instance

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the logged-in user
        console.log(user)
        setIsLoggedIn(true); // Mark user as logged in
      } else {
        setIsLoggedIn(false); // Mark user as not logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);


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
        <Route path="/barcode-scanner" element={<BarcodeScannerPage />} />
      </Routes>
      <FooterComponent />
    </Router>
    </>
  );
};

export default App;
