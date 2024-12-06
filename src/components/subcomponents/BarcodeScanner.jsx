import React, { useState } from 'react';
import { auth } from "../../firebase";
import { getIdToken } from "firebase/auth";
import axios from 'axios';

const BarcodeScanner = () => {
    const [barcodeId, setBarcodeId] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = async () => {
        if (!barcodeId) {
            alert("Please enter a barcode ID.");
            return;
        }

        const data = {
            id: barcodeId,
            date: new Date().toISOString(),
            location: location || 'Default Location',
            price: 100,
        };

        console.log('Data to send:', data);

        try {
            const user = auth.currentUser;

            if (!user) {
                alert('You must be logged in to update trip information.');
                throw new Error("User is not authenticated.");
            }

            console.log("Current User:", user);

            // Force refresh the token
            const token = await getIdToken(user, true);
            console.log("Token:", token);

            setIsLoading(true);

            // Axios POST request
            const response = await axios.post(
                'https://pathfinderedu-dc6d0-default-rtdb.firebaseio.com/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log('Data successfully saved:', response.data);
            alert('Trip information updated successfully!');
        } catch (error) {
            console.error('Error updating Firebase:', error.response || error.message);
            if (error.response) {
                alert(`Error: ${error.response.data.error || error.response.statusText}`);
            } else {
                alert('Error updating trip information. Please check your authentication or database rules.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Barcode Scanner</h1>
            <input
                type="text"
                placeholder="Enter Barcode ID"
                value={barcodeId}
                onChange={(e) => setBarcodeId(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                placeholder="Enter Location (Optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
                onClick={handleScan}
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: isLoading ? '#ccc' : '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
            >
                {isLoading ? 'Updating...' : 'Scan Barcode'}
            </button>
        </div>
    );
};

export default BarcodeScanner;
