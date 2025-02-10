import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import "./DriverLicenseScanner.css";

function ScanPage() {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    requestLandscapeMode();
    startZXingScanner();

    return () => stopScanner(); // Cleanup on unmount
  }, []);

  const requestLandscapeMode = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock("landscape");
      } catch (err) {
        console.warn("⚠️ Orientation lock failed:", err);
      }
    }
  };

  const startZXingScanner = async () => {
    const codeReader = new BrowserMultiFormatReader();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", aspectRatio: 16 / 9 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err) => {
          if (result) {
            alert("✅ Scan Successful: " + result.getText());
            window.close(); // ✅ Closes the scan window after success
          }
        },
        { formats: [BarcodeFormat.PDF_417] }
      );
    } catch (error) {
      alert("❌ Camera access denied. Please allow permissions.");
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
}

export default ScanPage;
