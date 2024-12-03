import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookTrip = () => {
  const [locations, setLocations] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map((country) => country.name.common);
        setLocations(countryNames.sort());
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Unable to fetch country names. Please try again later.');
      }
    };

    fetchLocations();
  }, []);

  const handleNext = () => {
    if (!startLocation || !endLocation) {
      navigate('/payment');
      return;
    }

    navigate('/payment', { state: { startLocation, endLocation } });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Error</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Book Your Trip</h1>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Start Location</label>
          <select
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Start Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Destination</label>
          <select
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Destination</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleNext}
          className="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookTrip;
