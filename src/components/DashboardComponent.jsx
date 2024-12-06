import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ref, get, set, onValue } from "firebase/database"; // Realtime Database functions
import app, { db } from '../firebase'; // Updated import to include db
import QRCode from 'react-qr-code';
import HomeIcon from "./icons/HomeIcon";
import BookIcon from "./icons/BookIcon.jsx";
import LogOutIcon from "./icons/LogOutIcon";
import DashboardHomeSubComponent from "./subcomponents/DashboardHomeSubComponent";
import TripsIcon from "./icons/TripsIcon";
import DashboardCreateTripSubComponent from "./subcomponents/DashboardCreateTripSubComponent.jsx";
import TripsMadeIcon from "./icons/TripsMadeIcon.jsx";
import DashboardMyTripsSubComponent from "./subcomponents/DashboardMyTripSubComponent.jsx";
import BarcodeScanner from './subcomponents/BarcodeScanner.jsx'; // Import BarcodeScanner
import MyTrips from '../pages/MyTrips';
import BookTrip from '../pages/BookTrip.jsx';
import ProfileComponent from "../components/ProfileComponent.jsx"
import ProfileIcon from "../components/icons/ProfileIcon.jsx"
import JsBarcode from 'jsbarcode';  // Import JsBarcode

const DashboardComponent = () => {
  const auth = getAuth(app); // Firebase auth
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [dashPage, setDashPage] = React.useState(1); // To store Realtime Database data

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userFormData');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBookTripRed = () => {
    navigate('/book-trip');
  };

  const handleMyTripsRed = () => {
    navigate('/my-trips');
  };

  const [links, setLinks] = React.useState([
    { title: "Principal", icon: <HomeIcon /> },
    { title: "Agendar viaje", icon: <BookIcon /> },
    { title: "Viajes", icon: <TripsIcon /> },
    { title: "Perfil", icon: <ProfileIcon /> },
    { title: "Cerrar sesión", icon: <LogOutIcon />, func: handleLogout },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const email = currentUser.email;
        const nameFromEmail = email?.split('@')[0];
        setUserName(nameFromEmail);

        const userRef = ref(db, `users/${currentUser.uid}`);

        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              const qrCodeValue = `https://yourapp.com/user/${currentUser.uid}`; // Customize as needed
              const defaultData = {
                name: nameFromEmail,
                qrCode: qrCodeValue,
                trip: "",
                cancerTrip: "",
                starts: "",
                createdAt: new Date().toISOString(),
              };
              set(userRef, defaultData);
              setUserData(defaultData);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          }
        });
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    const savedFormData = JSON.parse(localStorage.getItem('userFormData'));
    if (savedFormData) {
      // Handle form data
    }

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="w-full flex justify-between items-center h-[100vh] bg-gray-100 gap-5">
      <section className="w-1/6 h-[85%] mt-11 ml-4 flex flex-col bg-[#15800e] rounded-md">
        <div>
          <img src="/images/logo3.png" alt="Logo" />
        </div>

        <div className="w-5/6 flex flex-col gap-5 items-center justify-start mx-auto">
          {
            links?.length !== 0 && (
              links.map((value, idx) => {
                if (value?.func !== undefined) {
                  return (
                    <button
                      key={idx}
                      onClick={() => value?.func()}
                      className="w-full p-2 rounded-md flex justify-start items-center gap-4 text-md font-bold text-white hover:bg-white hover:text-[#15800e] transition-all duration-300"
                    >
                      {value?.icon} {value.title}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={idx}
                      className="w-full p-2 rounded-md flex justify-start items-center gap-4 text-md font-bold text-white hover:bg-white hover:text-[#15800e] transition-all duration-300"
                      onClick={() => setDashPage(idx + 1)}
                    >
                      {value?.icon} {value.title}
                    </button>
                  );
                }
              })
            )
          }
        </div>
      </section>

      <section className="w-5/6 h-[85%] mt-11 mr-4 flex flex-col justify-start bg-white rounded-md overflow-auto p-6">
        <Container user={user} userName={userName} userData={userData} dashPage={dashPage} />

      </section>
    </div>
  );
};

const Container = ({ user, userName, userData, dashPage }) => {
  switch (dashPage) {
    case 1:
      return <DashboardHomeSubComponent user={user} userName={userName} userData={userData} />;
    case 2:
      return <BookTrip />;
    case 3:
      return <MyTrips />;
    case 4:
      return <ProfileComponent />;
    default:
      return <DashboardHomeSubComponent user={user} userName={userName} userData={userData} />;
  }
};

export default DashboardComponent;
