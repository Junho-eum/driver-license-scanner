import { useEffect, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";

function DecodeDL({ imageSrc, onDecoded }) {
  const [decodeStatus, setDecodeStatus] = useState("Waiting for decoding...");

  useEffect(() => {
    if (imageSrc) {
      decodeBarcode(imageSrc);
    }
  }, [imageSrc]);

  const decodeBarcode = async (imageUrl) => {
    setDecodeStatus("Decoding...");
    console.log("🔍 Decoding Image URL:", imageUrl);

    try {
      const codeReader = new BrowserMultiFormatReader();
      const image = new Image();
      image.src = imageUrl;

      image.onload = async () => {
        console.log("✅ Image Loaded Successfully");

        try {
          // ✅ Perform barcode scan
          const result = await codeReader.decodeFromImageElement(image);

          // ✅ Only process PDF417 barcodes
          if (result.getBarcodeFormat() === BarcodeFormat.PDF_417) {
            console.log("✅ FULL PDF417 Barcode Data:", result.getText());
            onDecoded(result.getText());
            setDecodeStatus("✅ Decoding Successful");
          } else {
            console.warn("⚠ Not a PDF417 barcode:", result.getBarcodeFormat());
            setDecodeStatus("❌ This is not a PDF417 barcode.");
          }
        } catch (error) {
          console.error("❌ Error decoding barcode:", error);
          setDecodeStatus("❌ Unable to scan PDF417 barcode. Try another image.");
        }
      };

      image.onerror = () => {
        console.error("🚨 Error loading image! The URL might be invalid.");
        setDecodeStatus("❌ Failed to load image.");
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
