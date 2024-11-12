import React, { useState } from 'react';
import axios from 'axios';
import firebase from "../../firebase.jsx"
const BarcodeScanner = () => {
    const [barcodeId, setBarcodeId] = useState('');
    const [location, setLocation] = useState(''); // Set this to your desired location

    const handleScan = async () => {
        if (!barcodeId) {
            alert("Please enter a barcode ID.");
            return;
        }

        const data = {
            id: barcodeId,
            date: new Date().toISOString(), // Current date
            location: location || 'Default Location', // Default or user-defined location
            price: 100
        };

        console.log('Data to send:', data); // Log data to send

        try {
            const user = firebase.auth().currentUser; // Get the current user

            if (user) {
                const token = await user.getIdToken(); // Get the user's authentication token

                const response = await fetch(
                    'https://pathfinderedu-dc6d0-default-rtdb.firebaseio.com/trip.json',
                    {
                        method: 'POST', // Use 'PUT' if you want to update an existing record
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                        },
                        body: JSON.stringify(data) // Convert the data to JSON format
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json(); // Parse the JSON response
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
