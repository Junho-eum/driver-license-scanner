// components/cameraUtils.js

export const calculateBrightness = (imageData) => {
  let total = 0;
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    total += (r + g + b) / 3;
  }
  const brightnessLevel = total / (pixels.length / 4);
  console.log(brightnessLevel);
  return total / (pixels.length / 4);
};

export const detectBlurriness = (imageData) => {
  let totalDifference = 0;
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length - 4; i += 4) {
    const diff = Math.abs(pixels[i] - pixels[i + 4]); // Compare adjacent pixels
    totalDifference += diff;
  }

  const Bluriness = totalDifference / (pixels.length / 4);
  console.log(Bluriness);
  return Bluriness;
};

export const detectTilt = (videoElement) => {
  const rect = videoElement.getBoundingClientRect();
  const aspectRatio = rect.width / rect.height;

  if (aspectRatio > 1.8 || aspectRatio < 1.2) {
    return Math.abs(aspectRatio - 1.5) * 25; // Adjusted sensitivity
  }
  return 0;
};

export const detectDistance = (videoElement) => {
  const rect = videoElement.getBoundingClientRect();
  const widthRatio = rect.width / window.innerWidth;
  const heightRatio = rect.height / window.innerHeight;

  console.log("width: " + widthRatio);
  console.log("height: " + heightRatio);

  // ✅ If barcode size is too small, it's too far
  if (widthRatio < 0.3 || heightRatio < 0.3) {
    return true; // License is too far
  }
  return false;
};

export const monitorScanningIssues = (videoRef, setScanStatus) => {
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
