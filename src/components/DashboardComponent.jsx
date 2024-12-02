// DashboardComponent.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ref, get, set, onValue } from "firebase/database"; // Realtime Database functions
import app, { db } from '../firebase'; // Updated import to include db
import QRCode from 'react-qr-code';
import HomeIcon from "./icons/HomeIcon";
import LogOutIcon from "./icons/LogOutIcon";
import DashboardHomeSubComponent from "./subcomponents/DashboardHomeSubComponent";
import TripsIcon from "./icons/TripsIcon";
import DashboardCreateTripSubComponent from "./subcomponents/DashboardCreateTripSubComponent.jsx";
import TripsMadeIcon from "./icons/TripsMadeIcon.jsx";
import DashboardMyTripsSubComponent from "./subcomponents/DashboardMyTripSubComponent.jsx";

const DashboardComponent = () => {
  const auth = getAuth(app); // Firebase auth
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [dashPage, setDashPage] = React?.useState(1)// To store Realtime Database data

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userFormData');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally display an error message to the user
    }
  };

  const [links, setLinks] = React.useState([
    { title: "Inicio", icon: <HomeIcon /> },
    { title: "Mis viajes", icon: <TripsIcon /> },
    { title: "Hacer un viaje", icon: <TripsMadeIcon width={"20"} /> },
    { title: "Cerrar sesión", icon: <LogOutIcon />, func: handleLogout },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const email = currentUser.email;
        const nameFromEmail = email?.split('@')[0];
        setUserName(nameFromEmail);

        // Reference to the user's data in Realtime Database
        const userRef = ref(db, `users/${currentUser.uid}`);

        // Fetch existing user data
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              // If user data doesn't exist, create it
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

        // Listen for real-time updates
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
      // If you need to handle form data, you can process it here
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
                      onClick={() => setDashPage(idx+1)}
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
  console.log(dashPage)
  switch (dashPage) { // Assuming 'page' is always 1 for simplicity
    case 1:
      return <DashboardHomeSubComponent user={user} userName={userName} userData={userData}  />;
    case 2:
      return <DashboardMyTripsSubComponent user={user} userName={userName} userData={userData} />;
    case 3:
      return <DashboardCreateTripSubComponent user={user} userName={userName} userData={userData} />;
    default:
      return <DashboardHomeSubComponent user={user} userName={userName} userData={userData} />;
  }
};

export default DashboardComponent;
