import { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

function BarcodeScanner({ onScanSuccess }) {
  const videoRef = useRef(null);
  const [lastScanned, setLastScanned] = useState("");
  const [scanning, setScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState("Waiting for barcode...");

  useEffect(() => {
    if (scanning) {
      startScanner();
    }

    return () => stopScanner(); // Cleanup on unmount
  }, [scanning]);

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: videoRef.current, // Use the video element
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // Use the back camera on mobile
          },
        },
        decoder: {
          readers: ["code_128_reader", "code_39_reader"], // Gym card barcode formats
        },
        locate: true, // Enable barcode localization
      },
      (err) => {
        if (err) {
          console.error("QuaggaJS Initialization Failed:", err);
          setScanStatus("❌ Scanner initialization failed.");
          return;
        }
        Quagga.start();
        setScanStatus("Scanning...");
      }
    );

    Quagga.onDetected((result) => {
      const scannedCode = result.codeResult.code;
      if (scannedCode !== lastScanned) {
        console.log("✅ Barcode Scanned:", scannedCode);
        setLastScanned(scannedCode);
        onScanSuccess(scannedCode);
        setScanStatus(`✅ Scan Successful: ${scannedCode}`);
        stopScanner(); // Stop scanning after success
      }
    });
  };

  const stopScanner = () => {
    Quagga.stop();
    setScanning(false);
  };

  return (
    <div>
      <h2>Scan Your Gym Card</h2>
      <p>{scanStatus}</p>
      <div
        ref={videoRef}
        style={{ width: "100%", height: "400px", border: "2px solid black" }}
      />
      {lastScanned && (
        <div>
          <h3>Scanned Code:</h3>
          <p>{lastScanned}</p>
        </div>
      )}
      {!scanning && (
        <button onClick={() => setScanning(true)}>Scan Again</button>
      )}
    </div>
  );
}

export default BarcodeScanner;
