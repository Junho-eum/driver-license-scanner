import { MultiFormatReader, BarcodeFormat, DecodeHintType, BinaryBitmap, HybridBinarizer, RGBLuminanceSource } from "@zxing/library";
import Jimp from "jimp"; // Correct import for Jimp

async function scanBarcode(imagePath) {
  try {
    // Load image using Jimp
    const image = await Jimp.read(imagePath);
    
    // Convert image to grayscale and get pixel data
    image.grayscale();
    const { data, width, height } = image.bitmap;

    // Convert image data to ZXing format
    const luminanceSource = new RGBLuminanceSource(data, width, height);
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

    // Set up the barcode reader
    const reader = new MultiFormatReader();
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.PDF_417, BarcodeFormat.CODE_128]);
    reader.setHints(hints);

    // Scan for barcodes
    const results = reader.decodeMultiple(binaryBitmap);

    if (!results || results.length === 0) {
      console.log("❌ No barcodes found in image.");
      return;
    }

    // Filter out only PDF417 barcodes
    const pdf417Barcodes = results.filter(result => result.getBarcodeFormat() === BarcodeFormat.PDF_417);

    if (pdf417Barcodes.length > 0) {
      console.log("✅ PDF417 Barcodes Found:");
      pdf417Barcodes.forEach((barcode, index) => {
        console.log(`📌 Barcode ${index + 1}:`, barcode.getText());
      });
    } else {
      console.log("❌ No PDF417 barcodes detected.");
    }
  } catch (error) {
    console.error("🚨 Error scanning barcode:", error);
  }
}

// Run the function with an image file
scanBarcode("/Users/junhoeum/Desktop/IMG_2295.jpeg");