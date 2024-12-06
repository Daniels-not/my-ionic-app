import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { startLocation, endLocation } = location.state || {};

  const handlePayment = () => {
    console.log("Started payment    ")
    // Validation
    if (
      !cardNumber ||
      !cardName ||
      !expiryMonth ||
      !expiryYear ||
      !securityCode
    ) {
      setError("All fields are required");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Card number must be 16 digits");
      return;
    }

    if (!/^\d{3}$/.test(securityCode)) {
      setError("Security code must be 3 digits");
      return;
    }

    // Save last 4 digits of card number in local storage
    const lastFourDigits = cardNumber.slice(-4);
    localStorage.setItem("lastFourDigits", lastFourDigits);

    // Save trip history in local storage
    const userName = "ramycampusano44"; // Replace with dynamic user retrieval logic
    const purchaseDate = new Date().toISOString();

    const transaction = {
      userName,
      purchaseDate,
      startLocation,
      endLocation,
    };

    const tripHistory = JSON.parse(localStorage.getItem("tripHistory")) || [];
    localStorage.setItem("tripHistory", JSON.stringify([...tripHistory, transaction]));

    // Success message and redirection
    alert("Payment successful!");
    navigate("/my-trips");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Secure Payment</h2>

        <div className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium mb-1">Name on Card</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
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
              <label className="block text-sm font-medium mb-1">Expiry Month</label>
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
              <label className="block text-sm font-medium mb-1">Expiry Year</label>
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
            <label className="block text-sm font-medium mb-1">Security Code</label>
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
            className="w-full bg-indigo-500 text-white rounded px-4 py-2 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
