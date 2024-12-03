// DashboardHomeSubComponent.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // QR Code Generator
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database Imports
import { db } from '../../firebase'; // Import your Firebase configuration
import StarIcon from '../icons/StarIcon';
import CanceledTripIcon from '../icons/CanceledTripIcon';
import TripsMadeIcon from '../icons/TripsMadeIcon';

const DashboardCreateTripSubComponent = ({ user, userName }) => {

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
          <h2 className="text-2xl font-bold text-left">Nuevo Destino:</h2>
          <small className="text-md text-[#15800e]/80 font-semibold">Reservando viaje</small>
        </div>

      </section>

      {/** FORM SECTION  */}
      <section className="flex flex-col justify-between w-full mt-8">

        <form className="w-full flex flex-col justify-evenly items-center gap-5">

          {/* SECTION ONE */}
          <div className="w-full flex flex-row justify-evenly items-center gap-7">
            <label className="text-gray-500 flex flex-col w-1/2 ">
              Field: <input type="text" className="bg-gray-500/20 p-2 rounded"/>
            </label>

            <label className="text-gray-500 flex flex-col w-1/2">
              Field: <input type="text" className="bg-gray-500/20 p-2 rounded"/>
            </label>
          </div>

          {/* SECTION TWO */}
          <div className="w-full flex flex-row justify-evenly items-center gap-7">
            <label className="text-gray-500 flex flex-col w-2/3 ">
              Field: <input type="text" className="bg-gray-500/20 p-2 rounded"/>
            </label>

            <label className="text-gray-500 flex flex-col w-1/3">
              Field: <input type="text" className="bg-gray-500/20 p-2 rounded"/>
            </label>
          </div>

          {/* SECTION THREE */}
          <div className="w-full flex flex-row justify-evenly items-center gap-7">
            <label className="text-gray-500 flex flex-col w-full resize-none">
              Field: <textarea className="bg-gray-500/20 p-2 rounded h-[150px]" />
            </label>
          </div>

          {/* SECTION FOUR */}
          <div className="w-full flex flex-row justify-evenly items-center gap-7">

            <button
                type="submit"
                className="w-full bg-[#15800e] text-white font-bold py-2 px-4 rounded-md hover:bg-[#0b4007] transition duration-200"
            >
              Reservar
            </button>

            <button
                type="submit"
                className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Limpiar campos
            </button>

          </div>


        </form>

      </section>

    </div>
  );
};

export default DashboardCreateTripSubComponent;
