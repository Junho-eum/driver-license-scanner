// parseLicenseData.js - Parses the raw driver's license barcode data
export function parseLicenseData(rawData) {
    if (!rawData) return {};
  
    const parsedData = {};
    const fieldMap = {
      "DCA": "Vehicle Class",
      "DCB": "Restrictions",
      "DCD": "Endorsements",
      "DBA": "License Expiration Date",
      "DCS": "Last Name",
      "DAC": "First Name",
      "DAD": "Middle Name",
      "DBD": "Document Issue Date",
      "DBB": "Date of Birth",
      "DBC": "Gender",
      "DAY": "Eye Color",
      "DAU": "Height",
      "DAG": "Street Address",
      "DAH": "Apartment/Unit",
      "DAI": "City",
      "DAJ": "State",
      "DAK": "ZIP Code",
      "DAQ": "License Number",
      "DCF": "Document Discriminator",
      "DCG": "Country Code",
      "DDA": "REAL ID Compliance",
      "DDB": "License Record Update",
      "DCK": "Inventory Control Number"
    };
  
    // Split the raw data into lines based on spaces
    const lines = rawData.split(/\s+/);
  
    lines.forEach((line) => {
      const key = line.substring(0, 3); // First 3 characters = key
      const value = line.substring(3).trim(); // Rest = value
  
      if (fieldMap[key]) {
        parsedData[fieldMap[key]] = value;
      }
    });
  
    return parsedData;
  }
  