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

    try {
      const codeReader = new BrowserMultiFormatReader();
      const image = new Image();
      image.src = imageUrl;

      image.onload = async () => {
        try {
          const result = await codeReader.decodeFromImageElement(image, {
            formats: [BarcodeFormat.PDF_417], // 🔥 Decode PDF417 specifically
          });

          console.log("✅ Decoded Barcode:", result.getText());
          onDecoded(result.getText()); // Send decoded data back to parent
          setDecodeStatus("✅ Decoding Successful");
        } catch (error) {
          console.error("❌ Error decoding image:", error);
          setDecodeStatus("❌ Unable to scan barcode. Try another image.");
        }
      };
    } catch (error) {
      console.error("❌ Error loading image:", error);
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
