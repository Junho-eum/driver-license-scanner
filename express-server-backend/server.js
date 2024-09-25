import express from "express";
import cors from "cors";
import path from 'path'
import initDB from './db/db_init.js'
const __dirname = import.meta.dirname;

const app = express();
const port = process.env.EXPRESS_PORT || 8080;


app.use(express.json());
app.use(cors());

import survey from "./routes/survey.js";

app.use("/postsurvey", survey);

await initDB();

console.log('Will serve from ' + path.join(__dirname, '../dist'));
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/debug', express.static(path.join(__dirname, '../dist')));
app.use('/end', express.static(path.join(__dirname, '../dist')));
app.use('/survey', express.static(path.join(__dirname, '../dist')));

//AJA: needed to add this to actually list on the survey
app.listen(port, () => {
  console.log(`Express running on port localhost:${port}`)
});