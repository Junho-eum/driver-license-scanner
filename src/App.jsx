// css
import "./App.css";
import "survey-core/defaultV2.min.css";
import gwusec_logo from "./assets/images/gwusec.svg";
import { useSearchParams } from "react-router-dom";
import { Container, Grid, Box, TextField } from '@mui/material';

// Topbar
import TopBar from "./web-components/TopBar";

// Cookies
import { useState, useEffect } from "react";
import Cookies from "js-cookie";


const expireTime = import.meta.env.VITE_SURVEY_DATA_EXPIRE_DAYS;

// this function sets the expiration time of the localstorage
function setWithExpiry() {
  const now = new Date();
  const newTime = now.setDate(new Date().getDate() + expireTime);
  console.log(new Date(newTime));
  const item = {
    expiry: newTime,
  }
  localStorage.setItem("expire-time", JSON.stringify(item));
}

const storageItemKey = "survey-data";

// check to see if we already have data in localstorage
function checkStorage() {
  const prevData = window.localStorage.getItem(storageItemKey);
  const expireTime = localStorage.getItem("expire-time");
  if (prevData != null || expireTime != null && Cookies.get('prolificID') != null) {
    window.location.href = "/survey";
  }
}
export default function App() {

  checkStorage();

  const [searchParams] = useSearchParams();
  const [prolificID, setProlificID] = useState(searchParams.get("PROLIFIC_PID") || "");
  const studyID = searchParams.get("STUDY_ID" || "");
  const sessionID = searchParams.get("SESSION_ID" || "");

  const [fetchData, setFetchData] = useState("");
  const [surveyData, setSurveyData] = useState([]);
  // for disabling button
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(prolificID == "");

  // this useEffect checks if there's already data in the database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/postsurvey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prolificID,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const data = await response.json();
      setSurveyData(data.survey);
    };

    fetchData();
  }, []); // one time execute

  // this is used to set the treatment
  const getRequest = async () => {
    try {
      const response = await fetch("/postsurvey");
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const json = await response.json();
      setFetchData(json.treatment);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  getRequest();

  const handleInputProlificID = (id) => {
    setProlificID(id);
    setIsSubmitDisabled(id.toString().trim() == "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // prolific id in url
    const submittedProlificID = e.target.elements.prolificID.value.toString().trim();

    if (submittedProlificID != "") {
      setIsSubmitting(true);

      try {
        // set cookie
        Cookies.set("prolificID", submittedProlificID);
        Cookies.set("studyID", studyID);
        Cookies.set("sessionID", sessionID);
        Cookies.set("treatment", fetchData);
        // add expire date
        setWithExpiry();
        window.location.href = "/survey";

      } catch (error) {
        console.error("Error setting cookie:", error);
        // Handle any errors setting the cookie
      }
    }
    else {
      alert("Requires Prolific ID.")
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopBar />
      <Container maxWidth="lg">
        <Box
          px={4}
          py={5}
          my={5}
          boxShadow={3}
          borderRadius={2}
          className="bg-white"
        >
          <Grid container spacing={2}>
            <Grid item xs>
              <Box>
                <img
                  className="mx-auto mb-4"
                  src={gwusec_logo}
                  alt=""
                  width="72"
                  height="57"
                ></img>
                <div className="col-lg-6 mx-auto">
                  <p className="">
                    Dear Prolific user,<br />
                    Welcome to our study. Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus habitant eleifend fusce, sit mauris tortor ridiculus. 
                    Phasellus viverra ac nascetur justo mattis per aenean. Ridiculus vel turpis a mi efficitur ultricies lorem ultrices. Suspendisse ultricies 
                    lorem cras hac convallis faucibus molestie velit. Eu ipsum ipsum quam at eget erat ultricies ad? Hac magna pellentesque pretium, eu nulla 
                    conubia praesent pharetra. Facilisis risus odio in, finibus fringilla ultrices mollis vitae. Quis mollis vitae leo penatibus adipiscing nostra 
                    fringilla. Dolor ac eu suscipit in venenatis semper.
                  </p>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs>
              <Box
                component="form"
                onSubmit={handleSubmit}
                bgcolor="white"

                px={8}
                pt={6}
                pb={8}
                mb={4}
              >
                <Box mb={4} textAlign="center">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="id"
                    >
                      Please verify your Prolific ID
                    </label>

                    <TextField
                      id="id"
                      name="prolificID"
                      value={prolificID}
                      onChange={(e) => handleInputProlificID(e.target.value)}
                      variant="outlined"
                      inputProps={{ style: { textAlign: "center", width: "400px" } }}
                    />
                    <p>If incorrect, simply paste your Prolific ID.</p>
                  </div>
                  <br />
                  <div>
                    {
                      (Object.keys(surveyData).length > 0 || isSubmitting == false) ? "Your Prolific ID is invalid or your survey data is already collected." : ""
                    }
                  </div>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button
                      type="submit"
                      disabled={isSubmitDisabled}
                      className={(isSubmitDisabled ? 
                        "bg-gw-primary-disabled text-gw-primary-text-disabled" : 
                        "bg-gw-primary-blue text-white") + " rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold"}
                    >
                      Go to consent page
                    </button>

                  </div>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}