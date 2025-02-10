import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import DecodeDL from "./DecodeDL";
import "./DriverLicenseScanner.css"; // ✅ Import CSS file

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
  
  let scanningActive = true; // ✅ Prevents continuous execution

  useEffect(() => {
    if (scanning) {
      startZXingScanner();
    }
    return () => stopScanner(); // Cleanup on unmount
  }, [scanning]);

  useEffect(() => {
    if (isMobile) {
      forceLandscapeMode();
    }
  }, [isMobile]);

  
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

  const forceLandscapeMode = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock("landscape");
      } catch (err) {
        console.warn("⚠️ Orientation lock failed:", err);
      }
    }
  };
  
  const calculateBrightness = (imageData) => {
    let total = 0;
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      total += (r + g + b) / 3;
    }
    return total / (pixels.length / 4);
  };

  const detectBlurriness = (imageData) => {
    let totalDifference = 0;
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length - 4; i += 4) {
      const diff = Math.abs(pixels[i] - pixels[i + 4]); // Compare adjacent pixels
      totalDifference += diff;
    }

    return totalDifference / (pixels.length / 4);
  };

  const detectTilt = (videoElement) => {
    const rect = videoElement.getBoundingClientRect();
    const aspectRatio = rect.width / rect.height;

    if (aspectRatio > 1.8 || aspectRatio < 1.2) {
      return Math.abs(aspectRatio - 1.5) * 25; // Adjusted sensitivity
    }
    return 0;
  };

  const requestLandscapeMode = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock("landscape");
        console.log("📱 Switched to landscape mode");
      } catch (err) {
        console.error("❌ Orientation lock failed:", err);
      }
    } else {
      console.warn("⚠️ Orientation lock is not supported in this browser.");
    }
  };
  

  
  const detectDistance = (videoElement) => {
    const rect = videoElement.getBoundingClientRect();
    const widthRatio = rect.width / window.innerWidth;
    const heightRatio = rect.height / window.innerHeight;

    // ✅ If barcode size is too small, it's too far
    if (widthRatio < 0.3 || heightRatio < 0.3) {
      return true; // License is too far
    }
    return false;
  };

  const monitorScanningIssues = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let lastMessage = ""; // Store last displayed message to avoid unnecessary updates

    setInterval(() => {
      if (!videoRef.current) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const brightness = calculateBrightness(imageData);
      const blurLevel = detectBlurriness(imageData);
      const barcodeAngle = detectTilt(videoRef.current);
      const isTooFar = detectDistance(videoRef.current); // ✅ Detect Distance

      let message = "";

      // ✅ Detect lighting issues
      if (brightness < 40) {
        message =
          "⚠️ Too dark! Move to a brighter area or turn on the flashlight.";
      } else if (brightness > 220) {
        message = "⚠️ Too bright! Reduce glare by adjusting your angle.";
      }

      // ✅ Detect blurriness
      if (blurLevel < 5) {
        message =
          "⚠️ Barcode too blurry! Hold steady or ensure the camera lens is clean.";
      }

      // ✅ Detect tilt issues
      if (barcodeAngle > 10) {
        message = "⚠️ Barcode tilted! Keep the license flat and avoid angles.";
      }

      // ✅ Detect if the license is too far
      if (isTooFar) {
        message = "⚠️ License too far! Move closer to the camera for scanning.";
      }

      // ✅ Only update message if it's different to prevent unnecessary updates
      if (message && message !== lastMessage) {
        setScanStatus(message);
        lastMessage = message;
      }
    }, 500);
  };


  // ✅ Start ZXing Live Scanner (Preserving other logic)
  const startZXingScanner = async () => {
    console.log("🎥 Starting ZXing scanner...");
    scanningActive = true;
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 }, 
          height: { ideal: 720, min: 480 }, 
          aspectRatio: isMobile ? 4 / 3 : 5 / 3, // ✅ Ensures correct ratio
          focusMode: "continuous",
          depthNear: 0.2,
          depthFar: 1.0,
        },
      };
      

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      if (capabilities.torch) {
        track.applyConstraints({ advanced: [{ torch: true }] });
      }

      if (videoRef.current) {
        console.log("✅ Attaching high-res video stream...");
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // ✅ Start issue detection
        monitorScanningIssues();
      }
      

      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        async (result, err) => {
          if (!scanningActive) return;

          if (result) {
            const format = result.getBarcodeFormat();
            if (format === BarcodeFormat.PDF_417) {
              console.log("✅ PDF417 Barcode Scanned:", result.getText());
              scanningActive = false;
              processScannedBarcode(result.getText());
              await stopScanner();
            } else if (scanningActive) {
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
      <h2>Scan Your Driver's License</h2>
      <div style={{ fontWeight: "bold", color: "white" }}>
        📸 Please arrange your driver's license properly:
        <ul>
          <ul>Hold it flat without tilting</ul>
          <ul>Keep the camera still to capture the barcode properly</ul>
          <ul>Ensure good lighting</ul>
        </ul>
      </div>
      {showMessage && (
        <p
          id="scanStatus"
          style={{
            color: scanStatus.includes("❌")
              ? "red" // Critical errors (e.g., no camera, access denied)
              : scanStatus.includes("⚠️")
              ? "yellow" // Warnings (e.g., tilted barcode, bad lighting)
              : scanStatus.includes("📸")
              ? "white" // Camera alignment instructions
              : "white", // Default
            fontWeight: "bold",
          }}
        >
          {scanStatus}
        </p>
      )}

      {/* 📌 Video Scanner Box (Responsive for Mobile & Desktop) */}
      <div
        className="video-container"
        style={{
          maxWidth: isMobile ? "100%" : "800px", // ✅ Adjust width dynamically
          aspectRatio: isMobile ? "3 / 4" : "5 / 3", // ✅ Change ratio dynamically
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onClick={requestLandscapeMode} // 🔥 User taps to lock landscape
          style={{
            width: "100%",
            height: "auto",
            transform: isMobile && window.innerHeight > window.innerWidth ? "rotate(90deg) scaleX(-1)" : "scaleX(-1)", 
            objectFit: "cover",
          }}
        />



        
      </div>

      {/* Display Scan Status Message (Success/Error) */}

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
        <button onClick={() => window.location.reload()}>Scan Again</button>
      )}
    </div>
  );
}

export default DriverLicenseScanner;
