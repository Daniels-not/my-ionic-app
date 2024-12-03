// DashboardHomeSubComponent.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // QR Code Generator
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database Imports
import { db } from '../../firebase'; // Import your Firebase configuration
import StarIcon from '../icons/StarIcon';
import CanceledTripIcon from '../icons/CanceledTripIcon';
import TripsMadeIcon from '../icons/TripsMadeIcon';
import CompassIcon from "../icons/CompassIcon.jsx";

const DashboardMyTripsSubComponent = ({ user, userName }) => {

  /* State for QR Code */
  const [qrCode, setQrCode] = useState('');
  const [newTrip, setNewTrip] = useState({

  });

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

  return (
    <div className="p-4 w-full">

      {/** WELCOMING SECTION  */}
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-left">Mis viajes:</h2>
          <small className="text-md text-[#15800e]/80 font-semibold">todos los viajes reservados</small>
        </div>

      </section>

      {/** TRIPS SECTION  */}
      <section className="flex flex-col h-full justify-evenly w-full mt-16 items-center gap-1">

        <CompassIcon width={"180"} />
        <h3 className="text-gray-500/50 text-xl font-bold"> Actualmente, usted no tiene ningún viaje reservado...</h3>

      </section>

    </div>
  );
};

export default DashboardMyTripsSubComponent;
