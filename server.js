import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());


let connectionString = process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/";
mongoose.connect(connectionString).then(() => console.log("connected to DB")).catch(console.error);

app.listen(8080, () => {
  console.log("App listening on http://localhost:8080");
});
