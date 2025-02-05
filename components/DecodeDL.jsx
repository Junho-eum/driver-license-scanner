import { useEffect, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";

function DecodeDL({ imageSrc, onDecoded }) {
  const [decodeStatus, setDecodeStatus] = useState("Waiting for decoding...");

  useEffect(() => {
    if (imageSrc) {
      console.log("📸 Image received for decoding:", imageSrc);
      processImageForDecoding(imageSrc);
    }
  }, [imageSrc]);

  const processImageForDecoding = async (imageUrl) => {
    setDecodeStatus("Processing image...");

    try {
      let finalImageUrl = imageUrl;

      // ✅ Convert Blob URL to a Data URL (Fix for failed loading)
      if (imageUrl.startsWith("blob:")) {
        console.log("🔄 Converting Blob URL to Data URL...");
        finalImageUrl = await convertBlobToDataURL(imageUrl);
      }

      // ✅ Start barcode decoding with a fully loaded image
      decodeBarcode(finalImageUrl);
    } catch (error) {
      console.error("❌ Error processing image:", error);
      setDecodeStatus("❌ Failed to process image.");
    }
  };

  const convertBlobToDataURL = (blobUrl) => {
    return new Promise((resolve, reject) => {
      fetch(blobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const decodeBarcode = async (imageUrl) => {
    setDecodeStatus("Decoding...");

    try {
      const codeReader = new BrowserMultiFormatReader();
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageUrl;

      image.onload = async () => {
        try {
          console.log("📡 Image Loaded, Starting Decoding...");

          const result = await codeReader.decodeFromImageElement(image);
          console.log("✅ Decoded Barcode:", result.getText());

          onDecoded(result.getText());
          setDecodeStatus("✅ Decoding Successful");
        } catch (error) {
          console.error("❌ Error decoding image:", error);
          setDecodeStatus("❌ Unable to scan barcode. Try another image.");
        }
      };

      image.onerror = () => {
        console.error("❌ Failed to load image.");
        setDecodeStatus("❌ Failed to load image. Please try again.");
      };
    } catch (error) {
      console.error("❌ Error processing image:", error);
      setDecodeStatus("❌ Failed to process image.");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <p>{decodeStatus}</p>
    </div>
  );
}

export default DecodeDL;
