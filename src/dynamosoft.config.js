import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import "dynamsoft-barcode-reader";

// ✅ Load license key from environment variable
const licenseKey = import.meta.env.VITE_DYNAMSOFT_LICENSE_KEY;
if (!licenseKey) {
  console.error("❌ Dynamsoft license key is missing! Check your .env file.");
} else {
  LicenseManager.initLicense(licenseKey, { executeNow: true });
}

// ✅ Set the WASM engine path
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

// ✅ Preload barcode reader module
CoreModule.loadWasm(["DBR"]);
