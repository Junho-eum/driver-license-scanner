import express from "express";

// database
import db from "../db/connection.js";
const router = express.Router();

// This section will help you get a single record by id
router.post("/", async (request, res) => {
  let collection = await db.collection("survey-results");
  const prolificID = request.body.prolificID;
  const record = await collection.findOne({ PID: prolificID });

  if (!record) {
    res.send({ survey: {}, sessionData: prolificID }).status(200);
  } else {
    const survey = record.survey;
    console.log(survey);
    return { survey: survey, sessionData: prolificID };
  }
});

router.patch("/", async (request, res) => {
  try {
    // data from fetch
    const data = request.body;
    const collection = await db.collection("survey-results");

    // get survey info and prolificID and store it in JSON
    const jsonData = JSON.stringify(data.surveyData);
    const prolificID = data.prolificID;

    const surveyData = {
      PID: prolificID,
      survey: jsonData,
    };

    const p = await collection.findOne({ PID: prolificID });
    if (p) {
      const result = await collection.updateOne(
        { PID: prolificID },
        { $set: { survey: jsonData } }
      );
      return result;
    } else {
      const result = await collection.insertOne(surveyData);
      res.send(result).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

export default router;
