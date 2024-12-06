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
    
    // Título de la factura (centrado)
    doc.setFontSize(18);
    const title = "Factura";
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Centrar título horizontalmente
    doc.text(title, titleX, 20);  // Título centrado en la parte superior

    // Detalles del viaje (centrados)
    doc.setFontSize(12);
    const lineHeight = 10;
    const offsetX = doc.internal.pageSize.width / 2; // Comienza centrado horizontalmente
    let offsetY = 40; // Posición Y inicial para los detalles
    
    // Definir detalles de la factura
    const details = [
      `Fecha de compra: ${new Date(trip.purchaseDate).toLocaleString()}`,
      `Ubicación de origen: ${trip.startLocation}`,
      `Ubicación de destino: ${trip.endLocation}`,
      `Duración del viaje: ${trip.duration || "Por definir"}`,  // Duración del viaje
      `Total a pagar: $${trip.totalAmount || "50"}`,  // Precio fijo o dinámico
      `Método de pago: ${trip.paymentMethod || "Tarjeta"}`,
      `Número de tarjeta: **** **** **** ${trip.cardNumber || "No disponible"}`,  // Datos de la tarjet
    ];
    
    // Agregar los detalles al PDF
    details.forEach(detail => {
      const detailWidth = doc.getStringUnitWidth(detail) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const detailX = (doc.internal.pageSize.width - detailWidth) / 2; // Centrar texto horizontalmente
      doc.text(detail, detailX, offsetY);
      offsetY += lineHeight; // Mover hacia abajo para la siguiente línea
    });

    // Generación de código de barras
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, user.uid, {
      format: "CODE128",
      displayValue: true,
      fontSize: 14,
    });
    const barcodeImg = canvas.toDataURL("image/png");

    // Agregar el código de barras al PDF (centrado)
    const barcodeWidth = 100;  // Ancho del código de barras
    const barcodeX = (doc.internal.pageSize.width - barcodeWidth) / 2;  // Centrar el código de barras horizontalmente
    doc.addImage(barcodeImg, "PNG", barcodeX, offsetY + 10, barcodeWidth, 30, undefined, 'FAST');

    // Guardar el PDF
    doc.save(`TripReceipt-${trip.purchaseDate}.pdf`);
  };

  const handleCancelTrip = (index) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar este viaje?")) {
      const updatedTrips = [...tripHistory];
      updatedTrips.splice(index, 1);
      setTripHistory(updatedTrips);
      localStorage.setItem("tripHistory", JSON.stringify(updatedTrips));

      // Incrementar el contador de viajes cancelados
      const canceledTrips = parseInt(localStorage.getItem("canceledTrips")) || 0;
      localStorage.setItem("canceledTrips", canceledTrips + 1);

      alert("¡Viaje cancelado satisfactoriamente!");
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-left">
          Historial de viaje
        </h2>
        <small className="text-md text-[#15800e]/80 font-semibold">
          Cuenta básica
        </small>
      </div>
      {tripHistory.length === 0 ? (
        <p className="text-center text-gray-500">No hay ningún viaje</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">Fecha de compra</th>
                <th className="border px-4 py-2">Origen</th>
                <th className="border px-4 py-2">Destino</th>
                <th className="border px-4 py-2">Duración</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {tripHistory.map((trip, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2 text-center">
                    {new Date(trip.purchaseDate).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 text-center">{trip.startLocation}</td>
                  <td className="border px-4 py-2 text-center">{trip.endLocation}</td>
                  <td className="border px-4 py-2 text-center">{trip.duration || "Por definir"}</td>
                  <td className="border px-4 py-2 text-center">{`$${trip.totalAmount || "50"}`}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => generatePDFReceipt(trip)}
                      className="bg-[#15800e] text-white px-4 py-2 rounded hover:bg-[#15800e]/80 transition duration-300 mr-2"
                    >
                      Factura
                    </button>
                    <button
                      onClick={() => handleCancelTrip(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Cancelar
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
