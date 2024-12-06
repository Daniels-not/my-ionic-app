import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app, { db } from '../firebase';

const PaymentForm = () => {

  const [user, setUser] = React?.useState(null);
  const [userName, setUserName] = React?.useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { startLocation, endLocation, tripDate, tripTime } = location.state || {};

  React?.useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const email = currentUser.email;
        const nameFromEmail = email?.split('@')[0];
        setUserName(nameFromEmail);
      } else {
        setUser(null);
        setUserName(null);
      }
    });

  }, [])

  const handlePayment = () => {
    // Validation
    if (
      !cardNumber ||
      !cardName ||
      !expiryMonth ||
      !expiryYear ||
      !securityCode
    ) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      setError("El número de la tarjeta debe de ser 16 dígitos");
      return;
    }

    if (!/^\d{3}$/.test(securityCode)) {
      setError("El código de seguridad debe de ser de 3 dígitos");
      return;
    }

    // Save last 4 digits of card number in local storage
    const lastFourDigits = cardNumber.slice(-4);

    // Save trip history in local storage
    const purchaseDate = new Date().toISOString();

    // Save the trip details
    const transaction = {
      userName,
      purchaseDate,
      tripDate,
      tripTime,
      duration: "1h 30m", // Estimated trip duration
      startLocation,
      endLocation,
      cardNumber: lastFourDigits
    };

    const tripHistory = JSON.parse(localStorage.getItem("tripHistory")) || [];
    localStorage.setItem("tripHistory", JSON.stringify([...tripHistory, transaction]));

    // Success message and redirection
    alert("¡El pago fue hecho exitosamente!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Secure Payment</h2>

        <div className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">Nombre en la tarjeta</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Número de la tarjeta</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="0000 0000 0000 0000"
            />
          </div>

          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mes de expiración</label>
              <select
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Año de expiración</label>
              <select
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() + i}>
                    {new Date().getFullYear() + i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Código de seguridad</label>
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="000"
            />
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-[#15800e] text-white rounded px-4 py-2 hover:bg-[#15800e]/80 focus:ring-2 focus:ring-indigo-400"
          >
            ¡Paga ahora!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
