// BarcodeScannerPage.jsx
import React from 'react';
import BarcodeScanner from '../components/subcomponents/BarcodeScanner.jsx';
import { db } from '../firebase.jsx'; // Import db from Firebase config
import { ref, set } from 'firebase/database';

const BarcodeScannerPage = () => {
    const handleScan = async (scannedData) => {
        console.log('Received data from scanner:', scannedData);
        
        try {
            // Create a new reference with a unique key using current timestamp
            const dataRef = ref(db, 'scannedData/' + Date.now()); // Creates a unique path for each scan
            await set(dataRef, { data: scannedData });
            console.log('Data saved to Firebase Realtime Database');
        } catch (error) {
            console.error('Error updating Firebase:', error);
        }
    };

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: '20px'
            }}
        >
            <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Scan Your Barcode</h2>
            <div 
                style={{
                    width: '80%',
                    maxWidth: '400px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <BarcodeScanner onScan={handleScan} />
            </div>
        </div>
    );
};

export default BarcodeScannerPage;
