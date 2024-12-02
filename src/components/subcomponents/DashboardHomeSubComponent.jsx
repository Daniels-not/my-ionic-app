// DashboardHomeSubComponent.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // QR Code Generator
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database Imports
import { db } from '../../firebase'; // Import your Firebase configuration
import StarIcon from '../icons/StarIcon';
import CanceledTripIcon from '../icons/CanceledTripIcon';
import TripsMadeIcon from '../icons/TripsMadeIcon';

const DashboardHomeSubComponent = ({ user, userName }) => {
  
  /* State for Statistics */
  const [statistics, setStatistics] = useState({
    stars: 0,
    trips: 0,
    canceledTrips: 0,
  });

  /* State for QR Code */
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (user) {
      // Reference to the user's data in Realtime Database
      const userRef = ref(db, `users/${user.uid}`);

      // Listen for data changes
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Update statistics
          setStatistics({
            stars: data.stars || 0,
            trips: data.trips || 0,
            canceledTrips: data.canceledTrips || 0,
          });

          // Update QR Code
          setQrCode(data.qrCode || '');
        }
      }, (error) => {
        console.error("Error fetching user data:", error);
      });

      // Cleanup listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

  /* Statistics Data Array */
  const data = [
    { value: statistics.stars, title: "Stars", icon: <StarIcon /> },
    { value: statistics.trips, title: "Trips", icon: <TripsMadeIcon /> },
    { value: statistics.canceledTrips, title: "Canceled Trips", icon: <CanceledTripIcon /> },
  ];

  return (
    <div className="p-4 w-full">
      {/** WELCOMING SECTION  */}
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-left">Welcome, {user?.displayName}!</h2>
          <small className="text-md text-[#15800e]/80 font-semibold">Basic Account</small>
        </div>

        { /* <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
          <img src="/user_images/profile.jpeg" alt="Profile" className="w-full object-cover" />
        </div> */ }
      </section>

      {/** STATISTICS DATA  */}
      <section className="flex flex-col justify-between w-full mt-8">
        <div>
          <h2 className="text-2xl font-bold text-left">Your Statistics:</h2>
          <small className="text-md text-[#15800e]/80 font-semibold">Overview</small>
        </div>

        <div className="w-full flex flex-row justify-evenly items-center mt-4">
          {data.map((value, idx) => (
            <Card
              key={idx}
              data={value.value}
              title={value.title}
              icon={value.icon}
              isOdd={idx % 2 === 0}
            />
          ))}
        </div>
      </section>

      {/** QR CODE SECTION */}
      <section className="mt-8 flex justify-center">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Your QR Code:</h3>
          {qrCode ? (
            <div className="bg-white p-4 rounded shadow">
              <QRCode value={qrCode} size={300} />
            </div>
          ) : (
            <p className="text-gray-500">No QR Code available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const Card = ({ data, title, icon, isOdd }) => {
  return (
    <div
      className={`flex justify-between items-center w-1/4 rounded-md p-4 ${
        isOdd ? 'bg-[#95ff8d]' : 'bg-[#15800e]'
      }`}
    >
      <section
        className={`w-1/3 flex justify-center items-center ${
          isOdd ? 'text-[#15800e]' : 'text-white'
        }`}
      >
        {icon}
      </section>

      <section className={`flex flex-col w-2/3 text-center ${isOdd ? '' : 'text-white'}`}>
        <h1 className={`text-6xl font-bold ${isOdd ? 'text-[#15800e]' : 'text-white'}`}>
          {data}
        </h1>
        <h2 className={`text-md font-semibold ${isOdd ? 'text-[#15800e]' : 'text-white'}`}>
          {title}
        </h2>
      </section>
    </div>
  );
};

export default DashboardHomeSubComponent;
