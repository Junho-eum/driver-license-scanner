import { useState } from "react";
import DriverLicenseScanner from "../components/DriverLicenseScanner";
import ScanPage from "../components/ScanPage";

function App() {
  const [scannedData, setScannedData] = useState(null);

  return (
    <div>
      <h1>Driver's License Scanner</h1>
      {scannedData ? (
        <div>
          <h3>✅ Driver’s License Info:</h3>
          <ul style={{ textAlign: "left", maxWidth: "400px", margin: "auto" }}>
            {Object.entries(scannedData).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <button onClick={() => setScannedData(null)}>Scan Again</button>
          <Route path="/scan" element={<ScanPage />} /> {/* ✅ New scanning page */}
        </div>
      ) : (
        <DriverLicenseScanner onScanSuccess={setScannedData} />
      )}
    </div>
  );
}

export default App;
