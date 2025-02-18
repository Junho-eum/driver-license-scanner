import { useState } from "react";
import DriverLicenseScanner from "../components/DriverLicenseScanner";
import SelectAttributes from "../components/SelectAttributes";

function App() {
  const [scannedData, setScannedData] = useState(null);
  const [showSelectAttributes, setShowSelectAttributes] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleNext = () => {
    setShowSelectAttributes(true);
  };

  const handleComplete = (attributes) => {
    setSelectedAttributes(attributes);
    setShowSelectAttributes(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}
      >Driver's License Scanner</h1>
      {scannedData ? (
        showSelectAttributes ? (
          <SelectAttributes data={scannedData} onComplete={handleComplete} />
        ) : (
          <div>
            <h3>✅ Driver’s License Info:</h3>
            <ul
              style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}
            >
              {Object.entries(scannedData).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <button onClick={() => setScannedData(null)}>Scan Again</button>
            <button onClick={handleNext}>Next</button>
          </div>
        )
      ) : (
        <DriverLicenseScanner onScanSuccess={setScannedData} />
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

export default App;
