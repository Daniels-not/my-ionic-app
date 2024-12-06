import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";

const TripHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const storedTrips = JSON.parse(localStorage.getItem("tripHistory")) || [];
        setTripHistory(storedTrips);
      } else {
        setUser(null);
        setTripHistory([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const generatePDFReceipt = (trip) => {
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Trip Receipt", 105, 20, null, null, "center");

    // Add trip details
    doc.setFontSize(12);
    doc.text(`User Name: ${trip.userName}`, 10, 40);
    doc.text(`Purchase Date: ${new Date(trip.purchaseDate).toLocaleString()}`, 10, 50);
    doc.text(`Start Location: ${trip.startLocation}`, 10, 60);
    doc.text(`End Location: ${trip.endLocation}`, 10, 70);

    // Generate barcode
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, user.uid, {
      format: "CODE128",
      displayValue: true,
      fontSize: 14,
    });
    const barcodeImg = canvas.toDataURL("image/png");

    // Add barcode to PDF
    doc.addImage(barcodeImg, "PNG", 10, 80, 100, 30);

    // Save the PDF
    doc.save(`TripReceipt-${trip.purchaseDate}.pdf`);
  };

  const handleCancelTrip = (index) => {
    if (window.confirm("Are you sure you want to cancel this trip?")) {
      const updatedTrips = [...tripHistory];
      updatedTrips.splice(index, 1);
      setTripHistory(updatedTrips);
      localStorage.setItem("tripHistory", JSON.stringify(updatedTrips));

      // Increment the canceled trips count
      const canceledTrips = parseInt(localStorage.getItem("canceledTrips")) || 0;
      localStorage.setItem("canceledTrips", canceledTrips + 1);

      alert("Trip canceled successfully.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Trip History</h1>
      {tripHistory.length === 0 ? (
        <p className="text-center text-gray-500">No trips found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Purchase Date</th>
                <th className="border px-4 py-2">Start Location</th>
                <th className="border px-4 py-2">End Location</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tripHistory.map((trip, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{trip.userName}</td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(trip.purchaseDate).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 text-center">{trip.startLocation}</td>
                  <td className="border px-4 py-2 text-center">{trip.endLocation}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => generatePDFReceipt(trip)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Receipt
                    </button>
                    <button
                      onClick={() => handleCancelTrip(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TripHistory;
