import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookTrip = () => {
  const [regions, setRegions] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        // Fetch country details
        const response = await axios.get('https://api.first.org/data/v1/countries');
        const countryData = response.data[0]; // Assuming only one result is returned for "Dominican Republic"
        
        if (countryData && countryData.subdivisions) {
          // Set the subdivisions (regions) if available
          const regionNames = countryData.subdivisions.map((region) => region.name);
          setRegions(regionNames.sort());
        } else {
          // Fallback if API lacks detailed subdivisions
          const fallbackRegions = [
            'Distrito Nacional',
            'Santo Domingo',
            'Santiago',
            'San Cristóbal',
            'La Vega',
            'Puerto Plata',
            'La Romana',
            'San Pedro de Macorís',
            'Duarte',
            'Espaillat',
            'Azua',
            'Barahona',
            'Monte Cristi',
            'Peravia',
            'San Juan',
            'Hato Mayor',
            'El Seibo',
            'Sánchez Ramírez',
            'Monseñor Nouel',
            'Baoruco',
            'Dajabón',
            'Elías Piña',
            'Hermanas Mirabal',
            'Independencia',
            'La Altagracia',
            'María Trinidad Sánchez',
            'Monte Plata',
            'Pedernales',
            'Samaná',
            'Santiago Rodríguez',
            'Valverde'
          ];
          setRegions(fallbackRegions);
        }
      } catch (err) {
        console.error('Error fetching regions:', err);
        setError('Unable to fetch regions. Please try again later.');
        // Fallback to static regions in case of error
        setRegions([
          'Distrito Nacional',
          'Santo Domingo',
          'Santiago',
          'San Cristóbal',
          'La Vega',
          'Puerto Plata',
          'La Romana',
          'San Pedro de Macorís',
          'Duarte',
          'Espaillat',
          'Azua',
          'Barahona',
          'Monte Cristi',
          'Peravia',
          'San Juan',
          'Hato Mayor',
          'El Seibo',
          'Sánchez Ramírez',
          'Monseñor Nouel',
          'Baoruco',
          'Dajabón',
          'Elías Piña',
          'Hermanas Mirabal',
          'Independencia',
          'La Altagracia',
          'María Trinidad Sánchez',
          'Monte Plata',
          'Pedernales',
          'Samaná',
          'Santiago Rodríguez',
          'Valverde'
        ]);
      }
    };

    fetchRegions();
  }, []);

  const handleNext = () => {
    if (!startLocation || !endLocation) {
      return alert('Por favor seleccione su origen y destino.');
    }

    navigate('/payment', { state: { startLocation, endLocation } });
  };

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-semibold text-red-600">Error</h1>
  //         <p className="text-gray-700">{error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Agenda un viaje</h1>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Origen</label>
          <select
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Selecciona tu punto de origen</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Destino</label>
          <select
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Selecciona tu destino</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleNext}
          className="w-full mt-6 px-4 py-2 text-white bg-[#15800e] rounded-md hover:bg-[#15800e]/80 focus:outline-none focus:ring transition-all duration-300"
        >
          Hacer pago
        </button>
      </div>
    </div>
  );
};

export default BookTrip;
