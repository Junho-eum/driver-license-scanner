import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import DecodeDL from "./DecodeDL";
import "./DriverLicenseScanner.css"; // ✅ Import CSS file
import {
  calculateBrightness,
  detectBlurriness,
  detectTilt,
  detectDistance,
  monitorScanningIssues,
} from "./cameraUtils"; // Import functions from cameraUtils.js

function DriverLicenseScanner({ onScanSuccess }) {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const [lastScanned, setLastScanned] = useState("");
  const [scanning, setScanning] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const codeReaderRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [scanStatus, setScanStatus] = useState(
    "📸 Please arrange your driver's license properly:\n" +
      "- Hold it flat without tilting\n" +
      "- Ensure good lighting\n" +
      "- Avoid reflections and glare"
  );

  useEffect(() => {
    // ✅ Detect if the user is on a mobile device
    setIsMobile(/iPhone|iPad|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (scanning) {
      startZXingScanner();
    }
    return async () => await stopScanner(); // Cleanup on unmount
  }, [scanning]);

  const scanningActiveRef = useRef(true); // ✅ Prevents continuous execution

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

  // ✅ Start ZXing Live Scanner (Preserving other logic)
  const startZXingScanner = async () => {
    console.log("🎥 Starting ZXing scanner...");
    scanningActiveRef.current = true;
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: isMobile ? { exact: 960 } : { exact: 1920 }, // ✅ Reduce width for mobile
          height: isMobile ? { exact: 300 } : { exact: 1080 }, // ✅ Reduce height for mobile
          aspectRatio: isMobile ? 6 / 4 : 5 / 3, // ✅ Adjust aspect ratio dynamically
          focusMode: "continuous",
          depthNear: 0.2,
          depthFar: 1.0,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      // if (capabilities.torch) {
      //   track.applyConstraints({ advanced: [{ torch: true }] });
      // }

      if (videoRef.current) {
        console.log("✅ Attaching high-res video stream...");
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // ✅ Start issue detection
        monitorScanningIssues(videoRef, setScanStatus);
      }

      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        async (result, err) => {
          if (!scanningActiveRef.current) return;

          if (result) {
            const format = result.getBarcodeFormat();
            if (format === BarcodeFormat.PDF_417) {
              console.log("✅ PDF417 Barcode Scanned:", result.getText());
              scanningActiveRef.current = false;
              processScannedBarcode(result.getText());
              await stopScanner();
            } else if (scanningActiveRef.current) {
              console.warn("❌ Ignoring non-PDF417 barcode:", format);
              setShowMessage(true); // ✅ Show message once an invalid barcode is detected
            }
          }
        },
        {
          tryHarder: true,
          formats: [BarcodeFormat.PDF_417],
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
    scanningActiveRef.current = false; // ✅ Prevent future detections

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
    <div className="container">
      <h2 className="heading">Scan Your Driver's License</h2>
      <div className="instructions">
        📸 Please arrange your driver's license properly:
        <ul>
          <li>Hold it flat without tilting</li>
          <li>Keep the camera still to capture the barcode properly</li>
          <li>Ensure good lighting</li>
        </ul>
      </div>
      {showMessage && (
        <p
          id="scanStatus"
          className="scan-status"
          style={{
            color: scanStatus.includes("❌")
              ? "red"
              : scanStatus.includes("⚠️")
              ? "yellow"
              : scanStatus.includes("📸")
              ? "white"
              : "white",
          }}
        >
          {scanStatus}
        </p>
      )}

      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline muted />
      </div>

      <div className="upload-section">
        <h3>Upload Back of License</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      {uploadedImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImage}
            alt="Uploaded License"
            className="uploaded-image"
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
        <button
          className="scan-again-button"
          onClick={() => window.location.reload()}
        >
          Scan Again
        </button>
      )}
    </div>
  );
}

export default DriverLicenseScanner;