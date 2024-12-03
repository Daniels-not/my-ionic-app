import React from "react";
import { getAuth } from "firebase/auth";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";

const TripHistory = () => {
  const tripHistory = JSON.parse(localStorage.getItem("tripHistory")) || [];
  const auth = getAuth();
  const currentUser = auth.currentUser;

//   if (!currentUser) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto text-center">
//         <h1 className="text-3xl font-bold mb-6">Trip History</h1>
//         <p className="text-gray-500">Please log in to view your trip history.</p>
//       </div>
//     );
//   }

  const generatePDFReceipt = (trip) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Trip Receipt", 10, 10);

    // Add trip details
    doc.setFontSize(12);
    doc.text(`User Name: ${trip.userName}`, 10, 20);
    doc.text(`Purchase Date: ${new Date(trip.purchaseDate).toLocaleString()}`, 10, 30);
    doc.text(`Start Location: ${trip.startLocation}`, 10, 40);
    doc.text(`End Location: ${trip.endLocation}`, 10, 50);

    // Generate barcode
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, currentUser.uid, {
      format: "CODE128",
      displayValue: true,
      fontSize: 14,
    });
    const barcodeImg = canvas.toDataURL("image/png");

    // Add barcode to PDF
    doc.addImage(barcodeImg, "PNG", 10, 60, 100, 30);

    // Save the PDF
    doc.save(`TripReceipt-${trip.purchaseDate}.pdf`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Trip History</h1>
      {tripHistory.length === 0 ? (
        <p className="text-center text-gray-500">No trips found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">Purchase Date</th>
                <th className="border border-gray-300 px-4 py-2">Start Location</th>
                <th className="border border-gray-300 px-4 py-2">End Location</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tripHistory.map((trip, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{trip.userName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(trip.purchaseDate).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{trip.startLocation}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{trip.endLocation}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => generatePDFReceipt(trip)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      View Receipt
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
