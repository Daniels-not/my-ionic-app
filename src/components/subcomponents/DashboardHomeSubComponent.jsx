import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import StarIcon from "../icons/StarIcon";
import CanceledTripIcon from "../icons/CanceledTripIcon";
import TripsMadeIcon from "../icons/TripsMadeIcon";

const DashboardHomeSubComponent = ({ user, userName }) => {
  const [statistics, setStatistics] = useState({
    stars: 0,
    trips: 0,
    canceledTrips: 0,
  });

  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const localTripCount =
      JSON.parse(localStorage.getItem("tripHistory"))?.length || 0;

    const localCanceledTrips =
      parseInt(localStorage.getItem("canceledTrips")) || 0;

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);

      const unsubscribe = onValue(
        userRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setStatistics({
              stars: data.stars || 0,
              trips: (data.trips || 0) + localTripCount,
              canceledTrips: localCanceledTrips,
            });

            setQrCode(data.qrCode || "");
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
        }
      );

      return () => unsubscribe();
    } else {
      setStatistics((prev) => ({
        ...prev,
        trips: localTripCount,
        canceledTrips: localCanceledTrips,
      }));
    }
  }, [user]);

  const data = [
    { value: statistics.stars, title: "Estrellas", icon: <StarIcon /> },
    { value: statistics.trips, title: "Viajes", icon: <TripsMadeIcon /> },
    {
      value: statistics.canceledTrips,
      title: "Viajes cancelados",
      icon: <CanceledTripIcon />,
    },
  ];

  return (
    <div className="p-4 w-full">
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-left">
            Bienvenido, {user?.displayName || userName}!
          </h2>
          <small className="text-md text-[#15800e]/80 font-semibold">
            Cuenta básica
          </small>
        </div>
      </section>

      <section className="flex flex-col justify-between w-full mt-8">
        <div>
          <h2 className="text-2xl font-bold text-left">Estadísticas:</h2>
          <small className="text-md text-[#15800e]/80 font-semibold">Resumen</small>
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
    </div>
  );
};

const Card = ({ data, title, icon, isOdd }) => {
  return (
    <div
      className={`flex justify-between items-center w-1/4 rounded-md p-4 ${
        isOdd ? "bg-[#95ff8d]" : "bg-[#15800e]"
      }`}
    >
      <section
        className={`w-1/3 flex justify-center items-center ${
          isOdd ? "text-[#15800e]" : "text-white"
        }`}
      >
        {icon}
      </section>

      <section
        className={`flex flex-col w-2/3 text-center ${
          isOdd ? "" : "text-white"
        }`}
      >
        <h1
          className={`text-6xl font-bold ${isOdd ? "text-[#15800e]" : "text-white"}`}
        >
          {data}
        </h1>
        <h2
          className={`text-md font-semibold ${isOdd ? "text-[#15800e]" : "text-white"}`}
        >
          {title}
        </h2>
      </section>
    </div>
  );
};

export default DashboardHomeSubComponent;
