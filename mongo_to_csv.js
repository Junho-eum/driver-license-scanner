// database
import db from "./server/db/connection.js";
import csv, {Parser} from 'json2csv';
import fs from 'fs';

const collection = await db.collection("survey-results");

// replace with appropriate name
const outputFile = "prolific_survey_data.csv";

const results = await collection.find().toArray((err) => {
    if (err) {
        console.error(err);
        return;
    }
});

function flattenObject(obj, prefix = '') {
    const fieldsTop = [];
    const fieldsBottom = [];
    for (const key in obj) {
      const value = obj[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        const nested = flattenObject(value, newPrefix);
        fieldsTop.push(...nested[0]); // Append field names from nested results
        fieldsBottom.push(...nested[1]); // Append string values from nested results
      } else {
        fieldsTop.push(newPrefix.toString());
        fieldsBottom.push(value.toString());
      }
    }
    return [fieldsTop, fieldsBottom];
}

const keys = [];
const values = [];

results.forEach((obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key == "survey"){
        continue;
    }
    else{
        keys.push(key);
        values.push(value);
    }
  }

});
const csvFields = flattenObject(results[0].survey);

const csvParserTop = new Parser({ fields: csvFields[0], delimiter: ',' });
const csvDataTop = csvParserTop.parse(results, (doc) => flattenObject(doc));
const csvParserBottom = new Parser({ fields: csvFields[1], delimiter: ',' });
const csvDataBottom= csvParserBottom.parse(results, (doc) => flattenObject(doc));


fs.writeFileSync(outputFile, keys+csvDataTop + "\n" + values+csvDataBottom);

console.log(`Survey results exported to ${outputFile}`)
process.exit(0);