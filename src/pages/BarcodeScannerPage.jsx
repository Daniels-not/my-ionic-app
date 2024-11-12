// BarcodeScannerPage.jsx
import React from 'react';
import BarcodeScanner from '../components/subcomponents/BarcodeScanner.jsx';

const BarcodeScannerPage = () => {
    const handleScan = (scannedData) => {
        console.log('Received data from scanner:', scannedData);
        // Handle the scanned data here, such as updating the database
    };

    return (
        <div>
            <h2>Scan Your Barcode</h2>
            <BarcodeScanner onScan={handleScan} />
        </div>
    );
};

export default BarcodeScannerPage;
