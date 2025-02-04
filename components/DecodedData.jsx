import React from "react";
import { parseLicenseData } from "./parseLicenseData"; // Import parser

function DecodedData({ rawBarcode }) {
  if (!rawBarcode) {
    return <p>No data available.</p>;
  }

  // Parse the barcode data
  const parsedData = parseLicenseData(rawBarcode);

  return (
    <div style={{ textAlign: "left", padding: "10px" }}>
      <h3>Decoded License Data</h3>

      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <tbody>
          {Object.entries(parsedData).map(([key, value]) => (
            <tr key={key} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ fontWeight: "bold", padding: "8px" }}>{key}:</td>
              <td style={{ padding: "8px" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DecodedData;
