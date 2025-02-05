import { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import DecodeDL from "./DecodeDL";

function DriverLicenseScanner({ onScanSuccess }) {
  const videoRef = useRef(null);
  const [lastScanned, setLastScanned] = useState("");
  const [scanning, setScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState("Waiting for barcode...");
  const [isPDF417, setIsPDF417] = useState(false); // Toggle between Gym Card & Driver's License
  const [quaggaStarted, setQuaggaStarted] = useState(false); // 🔥 Track Quagga's state
  const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image

  useEffect(() => {
    if (scanning) {
      startScanner();
    }
    return () => stopScanner(); // Cleanup on unmount
  }, [scanning]);


  // Upload Photo Handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); // Store the image for preview
    }
  };

  // 🟢 Start Live Scanner (Quagga for Gym Cards, ZXing for PDF417)
  const startScanner = async () => {
    console.log("🔵 Starting scanner...");
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");

    if (videoDevices.length === 0) {
      console.error("🚨 No camera devices found.");
      setScanStatus("❌ No camera detected.");
      return;
    }

    if (isPDF417) {
      await startZXingScanner(); // Use ZXing for PDF417 (Driver's License)
    } else {
      await startQuaggaScanner(); // Use Quagga for 1D barcodes (Gym card)
    }
  };

  // ✅ Start ZXing Live Scanner (for PDF417 - Driver’s License)
  const startZXingScanner = async () => {
    console.log("🎥 Starting ZXing scanner...");
    const codeReader = new BrowserMultiFormatReader();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        console.log("✅ Attaching video stream...");
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // ✅ Ensure the scanner only processes PDF417 (Driver’s License format)
      codeReader.decodeFromVideoDevice(
        undefined, // Let browser pick camera
        videoRef.current,
        { formats: [BarcodeFormat.PDF_417] }, // 🔥 Restrict to PDF417
        (result, err) => {
          if (result) {
            console.log("✅ FULL Barcode Scanned:", result.getText());
            processScannedBarcode(result.getText()); // Pass full barcode text
          }
        }
      );
    } catch (error) {
      console.error("🚨 Camera access failed:", error);
      setScanStatus(
        "❌ Camera access denied. Please allow camera permissions."
      );
    }
  };


  // ✅ Start Quagga Live Scanner (for Gym Cards, Code 128/39)
  const startQuaggaScanner = async () => {
    console.log("🎥 Starting Quagga scanner...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        console.log("✅ Attaching video stream...");
        videoRef.current.srcObject = stream;
        videoRef.current.play(); // Ensure video starts playing
      }

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: videoRef.current || undefined, // 🔥 Fix: Prevent undefined target
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment", // Use back camera
            },
          },
          decoder: {
            readers: ["code_128_reader", "code_39_reader"], // 1D barcode formats
          },
          locate: true, // Enables barcode localization
        },
        (err) => {
          if (err) {
            console.error("🚨 QuaggaJS Initialization Failed:", err);
            setScanStatus("❌ Scanner initialization failed.");
            return;
          }
          console.log("✅ Quagga Scanner Started");
          Quagga.start();
          setQuaggaStarted(true); // 🔥 Mark Quagga as started
          setScanStatus("Scanning...");
        }
      );

      Quagga.onDetected((result) => {
        processScannedBarcode(result.codeResult.code);
      });
    } catch (error) {
      console.error("🚨 Camera access failed:", error);
      setScanStatus("❌ Camera access denied. Please allow camera permissions.");
    }
  };

  // ✅ Process the scanned barcode (From Live Camera or Image Upload)
  const processScannedBarcode = (barcode) => {
    if (barcode !== lastScanned) {
      console.log("✅ FULL Barcode Scanned:", barcode); // 🔥 Log full barcode
      setLastScanned(barcode);
      onScanSuccess(barcode); // Ensure the full data is passed
      setScanStatus(`✅ Scan Successful`);
      stopScanner();
    }
  };


  // ✅ Stop All Scanners (Fixed `undefined` error)
  const stopScanner = () => {
    console.log("🛑 Stopping scanners...");
    
    if (quaggaStarted) {
      console.log("🛑 Stopping Quagga...");
      Quagga.stop(); // Stop Quagga if it started
      setQuaggaStarted(false);
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
      <h2>Scan Your Driver's License</h2>
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

      {/* Toggle between scanning and upload */}
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={isPDF417}
            onChange={() => setIsPDF417((prev) => !prev)}
          />
          Scan Driver’s License (PDF417)
        </label>
      </div>
      
      {lastScanned && (
        <div>
          <h3>Decoded Data:</h3>
          <p>{lastScanned}</p>
        </div>
      )}

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
          />{" "}
          {/* Pass to Decoder */}
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