import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import DecodeDL from "./DecodeDL";

function DriverLicenseScanner({ onScanSuccess }) {
  const videoRef = useRef(null);
  const [lastScanned, setLastScanned] = useState("");
  const [scanning, setScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState("Waiting for barcode...");
  const [uploadedImage, setUploadedImage] = useState(null);
  const codeReaderRef = useRef(null);
  let scanningActive = true; // ✅ Prevents continuous execution

  useEffect(() => {
    if (scanning) {
      startZXingScanner();
    }
    return () => stopScanner(); // Cleanup on unmount
  }, [scanning]);

  // ✅ Upload Photo Handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  // ✅ Function to Parse PDF417 Driver's License Data
  const parsePDF417Data = (rawData) => {
    const parsedData = {};

    // 🔥 Remove non-relevant header data (if exists)
    rawData = rawData.replace(/@.*?\n/, "").trim(); // Removes "@" and ANSI headers

    // 🔥 Standard AAMVA-compliant field mappings
    const fieldMap = {
      DCA: "License Class",
      DCB: "Endorsements",
      DCD: "Restrictions",
      DBA: "License Expiry Date",
      DBB: "Date of Birth",
      DBC: "Gender",
      DCS: "Last Name",
      DAC: "First Name",
      DAD: "Middle Name",
      DBD: "License Issue Date",
      DAQ: "License Number",
      DAG: "Street Address",
      DAI: "City",
      DAJ: "State",
      DAK: "ZIP Code",
    };

    // 🔥 Extract each field based on AAMVA format
    Object.entries(fieldMap).forEach(([key, label]) => {
      const regex = new RegExp(`${key}([^\n\r]*)`);
      const match = rawData.match(regex);
      if (match) {
        parsedData[label] = match[1].trim();
      }
    });

    return parsedData;
  };

  // ✅ Start ZXing Live Scanner (Optimized for PDF417)
  const startZXingScanner = async () => {
    console.log("🎥 Starting ZXing scanner...");
    scanningActive = true; // ✅ Reset scanning flag
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 }, // Force high resolution
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        console.log("✅ Attaching high-res video stream...");
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // ✅ Scan Continuously Until a Valid PDF417 is Detected
      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        async (result, err) => {
          if (!scanningActive) return; // ✅ Prevents multiple detections

          if (result) {
            const format = result.getBarcodeFormat();
            if (format === BarcodeFormat.PDF_417) {
              console.log("✅ PDF417 Barcode Scanned:", result.getText());
              scanningActive = false; // ✅ Stop further detections
              processScannedBarcode(result.getText());
              await stopScanner();
            } else if (scanningActive) {
              // ✅ Log ignored barcodes only if scanning is active
              console.warn("❌ Ignoring non-PDF417 barcode:", format);
            }
          }
        },
        {
          tryHarder: true, // Improve detection in blurry/low-light conditions
          formats: [BarcodeFormat.PDF_417], // Restrict strictly to PDF417
        }
      );
    } catch (error) {
      console.error("🚨 Camera access failed:", error);
      setScanStatus(
        "❌ Camera access denied. Please allow camera permissions."
      );
    }
  };

  
  // ✅ Process the scanned barcode
  const processScannedBarcode = (barcode) => {
    if (barcode !== lastScanned) {
      console.log("✅ FULL PDF417 Barcode Scanned:", barcode);

      // 🔥 Parse the barcode data
      const parsedData = parsePDF417Data(barcode);

      console.log("✅ Parsed Data:", parsedData);
      setLastScanned(parsedData); // ✅ Store structured data instead of raw text
      onScanSuccess(parsedData);
      setScanStatus(`✅ Scan Successful`);
    }
  };

  // ✅ Stop Camera Scanner
  const stopScanner = async () => {
    console.log("🛑 Stopping scanner...");
    scanningActive = false; // ✅ Prevent future detections

    if (codeReaderRef.current) {
      await codeReaderRef.current.reset(); // ✅ Stop decoding immediately
      codeReaderRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop()); // Stop camera
      videoRef.current.srcObject = null;
    }

    setScanning(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scan Your Driver's License (PDF417 Only)</h2>
      <p>{scanStatus}</p>

      {/* Video Scanner Box */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          border: "2px solid black",
        }}
      >
        <video
          ref={videoRef}
          style={{ width: "100%", height: "400px" }}
          autoPlay
          playsInline
          muted
        />
      </div>

      {/* Upload Image Button */}
      <div style={{ marginTop: "20px" }}>
        <h3>Upload Back of License</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      {/* Display Uploaded Image Preview */}
      {uploadedImage && (
        <div style={{ marginTop: "10px" }}>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImage}
            alt="Uploaded License"
            style={{ width: "300px", border: "2px solid black" }}
          />
          <DecodeDL
            imageSrc={uploadedImage}
            onDecoded={(data) => setLastScanned(data)}
          />
        </div>
      )}

      {lastScanned && (
        <div>
          <h3>Decoded Data:</h3>
          <p>{lastScanned}</p>
        </div>
      )}

      {!scanning && (
        <button onClick={() => setScanning(true)}>Scan Again</button>
      )}
    </div>
  );
}

export default DriverLicenseScanner;
