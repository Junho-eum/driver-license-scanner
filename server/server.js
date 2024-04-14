import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

import survey from "./routes/survey.js";
app.use("/postsurvey", survey);

let connectionString =
  process.env.CONNECTION_STRING || "mongodb://root:example@localhost:27000/";
mongoose
  .connect(connectionString)
  .then(() => console.log("connected to DB"))
  .catch(console.error);
