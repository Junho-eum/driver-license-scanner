import { useEffect, useRef, useState } from "react";
import DecodeDL from "./DecodeDL";

function DriverLicenseScanner({ onScanSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null); // Stores captured image
  const [uploadedImage, setUploadedImage] = useState(null); // Stores uploaded image
  const [lastScanned, setLastScanned] = useState(""); // Stores barcode data
  const [cameraActive, setCameraActive] = useState(false); // Track camera state

  // ✅ Start the camera when the component mounts
  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Cleanup when unmounting
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error("🚨 Camera access denied:", error);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // ✅ Capture Image from Video and Convert to URL
  const captureImage = () => {
    if (!videoRef.current) return;
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    // 🔥 Convert image to grayscale & enhance contrast
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      const enhanced = avg > 128 ? 255 : 0; // Convert to black & white
      pixels[i] = enhanced; 
      pixels[i + 1] = enhanced;
      pixels[i + 2] = enhanced;
    }
    ctx.putImageData(imageData, 0, 0);
  
    const imageUrl = canvas.toDataURL("image/png");
    console.log("📸 Captured & Processed Image URL:", imageUrl);
  
    setCapturedImage(imageUrl);
  };
  

  // ✅ Handle Image Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
  
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Scale up for better barcode readability
        const scaleFactor = 2; 
        canvas.width = image.width * scaleFactor;
        canvas.height = image.height * scaleFactor;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
        // ✅ Convert image to grayscale & apply adaptive contrast
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
  
        for (let i = 0; i < pixels.length; i += 4) {
          const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
  
          // 🔥 Adaptive threshold: Use avg - 30 for better contrast
          const threshold = avg > (128 - 30) ? 255 : 0;
          pixels[i] = threshold; 
          pixels[i + 1] = threshold;
          pixels[i + 2] = threshold;
        }
  
        ctx.putImageData(imageData, 0, 0);
  
        // ✅ Convert canvas back to image URL
        const processedImageUrl = canvas.toDataURL("image/png");
        console.log("📸 Processed Uploaded Image:", processedImageUrl);
        setUploadedImage(processedImageUrl);
      };
    };
  };
  
  

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scan Your Driver's License</h2>

      {/* Camera Not Available Warning */}
      {!cameraActive && <p>❌ Camera access denied or unavailable.</p>}

      {/* Video Scanner */}
      <div style={{ position: "relative", display: "inline-block", border: "2px solid black" }}>
        <video ref={videoRef} style={{ width: "100%", height: "400px" }} autoPlay playsInline muted />
      </div>

      {/* Hidden Canvas for Capturing Frame */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Capture Button */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={captureImage} disabled={!cameraActive}>📸 Capture License</button>
      </div>

      {/* Upload Image Button */}
      <div style={{ marginTop: "20px" }}>
        <h3>Upload Back of License</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      {/* Display Captured Image */}
      {capturedImage && (
        <div style={{ marginTop: "10px" }}>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured License" style={{ width: "300px", border: "2px solid black" }} />
          <DecodeDL imageSrc={capturedImage} onDecoded={setLastScanned} />
        </div>
      )}

      {/* Display Uploaded Image */}
      {uploadedImage && (
        <div style={{ marginTop: "10px" }}>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImage} alt="Uploaded License" style={{ width: "300px", border: "2px solid black" }} />
          <DecodeDL imageSrc={uploadedImage} onDecoded={setLastScanned} />
        </div>
      )}

      {/* Decoded Data */}
      {lastScanned && (
        <div>
          <h3>Decoded Data:</h3>
          <p>{lastScanned}</p>
        </div>
      )}
    </div>
  );
}

export default DriverLicenseScanner;
