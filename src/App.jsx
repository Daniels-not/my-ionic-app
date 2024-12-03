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
import BookTrip from './pages/BookTrip';
import MyTrips from './pages/MyTrips';
import PaymentForm from './components/PaymentForm';


// import BarcodeScannerPage from "./pages/BarcodeScannerPage.jsx";

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
          <Route path="/book-trip" element={<BookTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
      <FooterComponent />
    </Router>
    </>
  );
};

export default App;
