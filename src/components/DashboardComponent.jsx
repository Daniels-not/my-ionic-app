// DashboardComponent.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ref, get, set, update, onValue } from "firebase/database";
import app, { db } from '../firebase.jsx';
import Barcode from 'react-barcode';
import HomeIcon from "./icons/HomeIcon";
import LogOutIcon from "./icons/LogOutIcon";
import DashboardHomeSubComponent from "./subcomponents/DashboardHomeSubComponent";
import TripsIcon from "./icons/TripsIcon";
import DashboardCreateTripSubComponent from "./subcomponents/DashboardCreateTripSubComponent.jsx";
import TripsMadeIcon from "./icons/TripsMadeIcon.jsx";
import DashboardMyTripsSubComponent from "./subcomponents/DashboardMyTripSubComponent.jsx
import BarcodeScanner from './subcomponents/BarcodeScanner.jsx'; // Import BarcodeScanner

const DashboardComponent = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [dashPage, setDashPage] = React?.useState(1)// To store Realtime Database data
  const [scanning, setScanning] = useState(false); // State to toggle scanner

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userFormData');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
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

        const userRef = ref(db, `users/${currentUser.uid}`);

        get(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                setUserData(snapshot.val());
              } else {
                const barcodeValue = currentUser.uid;
                const defaultData = {
                  name: nameFromEmail,
                  barcode: barcodeValue,
                  trip: "",
                  cancelTrip: "",
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

    return () => unsubscribe();
  }, [auth]);

  const handleOpenScanner = () => {
    window.open('/barcode-scanner', '_blank'); // Opens BarcodeScannerPage in a new tab
  };

  const handleScan = async (scannedData) => {
    if (user) {
      const tripData = {
        userLocation: "Location Placeholder", // Replace with actual location logic
        date: new Date().toISOString(),
        price: 100, // Set your price logic here
      };

      const userRef = ref(db, `users/${user.uid}/trips`);
      await update(userRef, {
        [new Date().getTime()]: tripData, // Use timestamp as unique key
      });

      console.log("Trip data updated with scanned barcode:", tripData);
      setScanning(false); // Close scanner after scan
    }
  };

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
      <div className="w-full flex justify-between items-center h-[100vh] bg-gray-100 gap-5">
        <section className="w-1/6 h-[85%] mt-11 ml-4 flex flex-col bg-[#15800e] rounded-md">
          <div>
            <img src="/images/logo3.png" alt="Logo" />
          </div>

          <div className="w-5/6 flex flex-col gap-5 items-center justify-start mx-auto">
            {
                links?.length !== 0 && (
                    links.map((value, idx) => (
                        <button
                            key={idx}
                            onClick={() => value?.func ? value?.func() : null}
                            className="w-full p-2 rounded-md flex justify-start items-center gap-4 text-md font-bold text-white hover:bg-white hover:text-[#15800e] transition-all duration-300"
                        >
                          {value?.icon} {value.title}
                        </button>
                    ))
                )
            }
            <button
                onClick={handleOpenScanner}
                className="w-full p-2 rounded-md flex justify-center items-center gap-4 text-md font-bold text-white bg-[#0073e6] hover:bg-white hover:text-[#0073e6] transition-all duration-300"
            >
              Scan Barcode
            </button>
          </div>
        </section>

        <section className="w-5/6 h-[85%] mt-11 mr-4 flex flex-col justify-start bg-white rounded-md overflow-auto p-6">
          <Container user={user} userName={userName} userData={userData} />
          {scanning && <BarcodeScanner user={user} onScan={handleScan} />} {/* BarcodeScanner component */}
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
      
      { /* return (
          <div>
            <DashboardHomeSubComponent user={user} userName={userName} userData={userData} />
            {userData?.barcode && (
                <div className="barcode-section">
                  <Barcode value={userData.barcode} />
                </div>
            )}
          </div>
      ); */}

    default:
      return <DashboardHomeSubComponent user={user} userName={userName} userData={userData} />;
  }
};

export default DashboardComponent;
