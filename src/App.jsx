import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import DriverLicenseScanner from "../components/DriverLicenseScanner";


function App() {
  const [scannedData, setScannedData] = useState("");

  return (
    <div>
      <h1>Driver's License Scanner</h1>
      {scannedData ? (
        <div>
          <h3>Scanned Data:</h3>
          <p>{scannedData}</p>
          <button onClick={() => setScannedData("")}>Scan Again</button>
        </div>
      ) : (
        <DriverLicenseScanner onScanSuccess={setScannedData} />
      )}
      
    </div>
    
  );
}

export default App;
