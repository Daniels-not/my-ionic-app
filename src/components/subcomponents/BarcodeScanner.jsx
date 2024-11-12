import React, { useState } from 'react';
import { auth } from "../../firebase"; // Use the correct path to firebaseConfig
import { getIdToken } from "firebase/auth";

const BarcodeScanner = () => {
    const [barcodeId, setBarcodeId] = useState('');
    const [location, setLocation] = useState('');

    const handleScan = async () => {
        if (!barcodeId) {
            alert("Please enter a barcode ID.");
            return;
        }

        const data = {
            id: barcodeId,
            date: new Date().toISOString(),
            location: location || 'Default Location',
            price: 100
        };

        console.log('Data to send:', data);

        try {
            const user = auth.currentUser; // Access the user via the auth instance

            if (user) {
                const token = await getIdToken(user); // Get the user's token

                const response = await fetch(
                    'https://pathfinderedu-dc6d0-default-rtdb.firebaseio.com/trip.json',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log('Data successfully saved:', responseData);
                alert('Trip information updated successfully!');
            } else {
                console.error('User is not authenticated');
                alert('You must be logged in to update trip information.');
            }
        } catch (error) {
            console.error('Error updating Firebase:', error.message);
            alert('Error updating trip information. Please try again.');
        }
    };

    return (
        <div>
            <h1>Barcode Scanner</h1>
            <input
                type="text"
                placeholder="Enter Barcode ID"
                value={barcodeId}
                onChange={(e) => setBarcodeId(e.target.value)}
            />
            <button onClick={handleScan}>Scan Barcode</button>
        </div>
    );
};

export default BarcodeScanner;
