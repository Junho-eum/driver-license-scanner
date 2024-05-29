// database
import db from "./server/db/connection.js";
import csv from 'json2csv';
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

const csvData = csv.parse(results);
fs.writeFileSync(outputFile, csvData);

console.log(`Survey results exported to ${outputFile}`)
process.exit(0);