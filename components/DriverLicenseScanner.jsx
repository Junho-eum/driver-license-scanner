import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import DecodeDL from "./DecodeDL";

function DriverLicenseScanner({ onScanSuccess }) {
  const videoRef = useRef(null);
  const [lastScanned, setLastScanned] = useState("");
  const [scanning, setScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState("Waiting for barcode...");
  const [uploadedImage, setUploadedImage] = useState(null); // Store captured image

  useEffect(() => {
    if (scanning) {
      startCamera();
    }
    return () => stopCamera(); // Cleanup on unmount
  }, [scanning]);

  // ✅ Start Camera for Live View (No Live Decoding)
  const startCamera = async () => {
    console.log("🎥 Starting Camera...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1920, height: 1080 }, // High resolution
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("🚨 Camera access failed:", error);
      setScanStatus("❌ Camera access denied.");
    }
  };

  // ✅ Capture Frame from Video and Decode It
  const captureImageAndDecode = () => {
    if (!videoRef.current) return;

    console.log("📸 Capturing Image...");

    // Create a canvas to capture the frame
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas to a Data URL (Base64 Image)
    const imageDataUrl = canvas.toDataURL("image/png");

    // Store the captured image for preview
    setUploadedImage(imageDataUrl);

    // Pass the image to the same function used for uploaded files
    decodeBarcodeFromCapturedImage(imageDataUrl);
  };

  // ✅ Decode Barcode from Captured Image using DecodeDL (Same as Upload)
  const decodeBarcodeFromCapturedImage = async (imageDataUrl) => {
    console.log("🔍 Decoding barcode from captured image...");

    try {
      // Using DecodeDL component to process the image
      setLastScanned(""); // Clear previous result
      setTimeout(() => {
        setLastScanned(imageDataUrl); // Store image for DecodeDL
      }, 500);

      setScanning(false);
      stopCamera();
    } catch (error) {
      console.error("🚨 Image Decoding Failed:", error);
      setScanStatus("❌ Failed to decode barcode from image.");
    }
  };

  // ✅ Stop Camera Stream
  const stopCamera = () => {
    console.log("🛑 Stopping Camera...");
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop()); // Stop camera
      videoRef.current.srcObject = null;
    }
  };

  // ✅ Upload Photo Handler (Ensures DecodeDL Processes Image)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl); // Store the image for preview

      // Ensure DecodeDL processes the image
      setTimeout(() => {
        setLastScanned(imageUrl);
      }, 500); // Small delay ensures state updates correctly
    }
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

      {/* Capture Frame from Video Button */}
      {scanning && (
        <button onClick={captureImageAndDecode} style={{ marginTop: "10px" }}>
          📸 Capture & Decode
        </button>
      )}

      {/* Display Captured Image Preview */}
      {uploadedImage && (
        <div style={{ marginTop: "10px" }}>
          <h3>Captured Image:</h3>
          <img
            src={uploadedImage}
            alt="Captured License"
            style={{ width: "300px", border: "2px solid black" }}
          />
        </div>
      )}

      {/* Use DecodeDL Component to Extract Barcode from Image */}
      {lastScanned && (
        <div>
          <h3>✅ FULL Barcode Scanned:</h3>
          <DecodeDL
            imageSrc={lastScanned}
            onDecoded={(data) => setLastScanned(data)}
          />
        </div>
      )}

      {/* Upload Image Option */}
      <div style={{ marginTop: "20px" }}>
        <h3>Upload Back of License</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      {!scanning && (
        <button onClick={() => setScanning(true)}>Scan Again</button>
      )}
    </div>
  );
}

export default DriverLicenseScanner;
