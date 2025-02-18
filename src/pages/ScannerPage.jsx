import { useState } from "react";
import DriverLicenseScanner from "../scanner-components/DriverLicenseScanner";
import SelectAttributes from "../scanner-components/SelectAttributes";
import "../scanner-components/DriverLicenseScanner.css"; // ✅ Import CSS file

function ScannerPage({ onComplete }) {
  // ✅ Pass onComplete as prop
  const [scannedData, setScannedData] = useState(null);
  const [showSelectAttributes, setShowSelectAttributes] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [scanComplete, setScanComplete] = useState(false); // ✅ Track scanning completion

  const handleNext = () => {
    setShowSelectAttributes(true);
  };

  const handleComplete = (attributes) => {
    setSelectedAttributes(attributes);
    setShowSelectAttributes(false);
  };

  
  return (
    <div>
      {/* ✅ Render new page with parsed data after scanning */}
      {scanComplete ? (
        <div>
          <h3>✅ Scanned Driver’s License Info:</h3>
          <ul
            style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}
          >
            {Object.entries(scannedData).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          {/* ✅ Ensure "Scan Again" button is always visible */}
          <button
            onClick={() => {
              setScannedData(null);
              setScanComplete(false); // ✅ Reset scanner state
            }}
          >
            Scan Again
          </button>
          <button onClick={handleNext}>Next</button>
          <button onClick={onComplete}>Continue Survey</button>{" "}
          {/* ✅ Moves to next survey step */}
        </div>
      ) : (
        <DriverLicenseScanner
          onScanSuccess={(data) => {
            setScannedData(data);
            setScanComplete(true); // ✅ Move to parsed data page
          }}
        />
      )}

      {/* ✅ Show Select Attributes Page when applicable */}
      {showSelectAttributes && (
        <SelectAttributes data={scannedData} onComplete={handleComplete} />
      )}

      {selectedAttributes.length > 0 && (
        <div>
          <h3>Non-Disclosure Attributes:</h3>
          <ul>
            {selectedAttributes.map((attr, index) => (
              <li key={index}>{attr}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScannerPage;
