// survey info
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import surveyJson from "../survey";
import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { Backdrop, Card, CardContent, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './surveyPage.css';

// cookie
import Cookies from "js-cookie";

// other components
import TopBar from "../web-components/TopBar";
import PercentageProgressBar from "../web-components/ProgressBar";
import OptOutButton from "../web-components/OptOutButton";

// custom widgets and components
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
import { ExamNextButton } from "../survey-components/NextButton";
import { RegisterHTMLSlideShow } from "../survey-components/CustomHTMLSlideShowComponent";
import '../survey-components/CustomMatrixComponent';

//import { from } from "json2csv/JSON2CSVTransform";
import '../survey-components/CustomMatrixComponent';
import { render } from "react-dom";

import ScannerPage from "./ScannerPage";
// good resource: https://github.com/mongodb-developer/mern-stack-example/

const storageItemKey = "survey-data";

// const currentDate = Date();
function saveSurveyData(survey) {
  const data = survey.data;
  data.pageNo = survey.currentPageNo;
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}

/**
 * Stores survey data to the remote DB using async function.
 * @param {*} surveyData 
 * @param {*} prolific 
 * @param {*} T 
 * @param {*} WD 
 */
async function SendToServer(surveyData, prolific, T, WD, theStartDate, theEndDate) {
  console.log("Start date being sent:", theStartDate);
  console.log("End date being sent:", theEndDate);
  await PatchSurveyData(surveyData, prolific, T, WD, theStartDate, theEndDate);
}

/**
 * Patches survey data in the remote DB using the fetch API.
 * @param {*} surveyData 
 * @param {*} prolific 
 * @param {*} T 
 * @param {*} WD 
 * @returns Promise using the fetch API 
 */
async function PatchSurveyData(surveyData, prolific, T, WD, theStartDate, theEndDate) {

  return fetch("/postsurvey", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prolificID: prolific,
      surveyData: surveyData,
      treatment: T,
      startDate: theStartDate,
      endDate: theEndDate,
      withdrawn: WD,
      feedback: "",
    }),
  });
}

// Retrieve the `endDate` from localStorage if it exists, else null.
function getEndDateOrNull() {
  const ed = localStorage.getItem("endDate");
  console.log("Retrieved endDate from localStorage:", ed);
  return ed ? ed : null;
}

// this function checks the expire time of the data
function getWithExpiry() {

  const itemStr = localStorage.getItem("expire-time");
  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("survey-data");
    localStorage.removeItem("expire-date");
    window.location.href = window.history.back();
  }
}
function checkStorage() {
  const itemStr = localStorage.getItem("expire-time");
  if (itemStr == null) {
    window.location.href = window.history.back();
  }
}

function setTimeStampPageEntered() {
  try {
    const now = Date.now();
    const item = {
      timeStamp: now,
    }
    localStorage.setItem("timeStampPageEntered", JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
}

function getTimeStampPageEntered() {
  try {
    const itemStr = localStorage.getItem("timeStampPageEntered");
    const item = JSON.parse(itemStr);
    return item.timeStamp;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export default function SurveyPage() {
  // create state to track when to switch from SurveyJS to ScannerPage
  const [renderComponent, setRenderComponent] = useState("surveyjs");

  const [openWindowTooSmallDialogue, setOpenWindowTooSmallDialogue] =
    useState(false);

  const [survey] = useState(new Model(surveyJson));

  // If there's already a start date in localStorage, use it; else create a new one
  const [startDate] = useState(() => {
    const storedStart = localStorage.getItem("startDate");
    if (storedStart) {
      return storedStart;
    } else {
      const newStart = new Date().toISOString();
      localStorage.setItem("startDate", newStart);
      return newStart;
    }
  });

  // check if we have storage
  checkStorage();
  // check if we're expired
  getWithExpiry();

  survey.onValueChanged.add(saveSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);
  survey.applyTheme({
    cssVariables: {
      "--sjs-font-size": "20px", // according to this paper, 18px should be the minimum font size for text-heavy websites: https://pielot.org/pubs/Rello2016-Fontsize.pdf
    },
    isPanelless: false,
    themeName: "default",
    colorPalette: "light",
  });

  // custom widgets and components
  ExamConfirmationButton(survey);
  ExamNextButton(survey);
  RegisterHTMLSlideShow(survey);

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey);
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  // Called once AFTER each page is rendered
  survey.onAfterRenderPage.add((survey, options) => {
    const pageName = survey.currentPage?.name || survey.currentPageNo;
    let times = survey.getValue("timeSpentOnPages") || {};
    times[pageName] = { timeStampEntered: Date.now(), timeStampLeft: null };
    survey.setValue("timeSpentOnPages", times);
  });

  // Called BEFORE leaving the current page
  survey.onCurrentPageChanging.add((survey, options) => {
    const pageName = survey.currentPage?.name || survey.currentPageNo;
    let times = survey.getValue("timeSpentOnPages") || {};
    times[pageName].timeStampLeft = Date.now();
    // Store the updated timing info back into survey data
    survey.setValue("timeSpentOnPages", times);
  });

  const handleWithdrawSurvey = async () => {
    const cDataProlific = Cookies.get("prolificID");
    const cDataTreatment = Cookies.get("treatment");
    const updatedData = survey.data;
    updatedData.pageNo = survey.currentPageNo;
    const WD = "true";
    const endDate = new Date().toISOString(); // Mark end date
    // Save to localStorage so future calls won't overwrite it with null
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("finished", "true");
    await SendToServer(
      updatedData,
      cDataProlific,
      cDataTreatment,
      WD,
      startDate,
      endDate
    );
    window.location.href = "/end";
  };

  survey.onCurrentPageChanged.add(async (survey) => {
    console.log("[INFO] Current survey page: " + survey.currentPage.toString());
    const cDataProlific = Cookies.get("prolificID");
    const cDataTreatment = Cookies.get("treatment");
    const updatedData = survey.data;
    updatedData.pageNo = survey.currentPageNo;
    const WD = "false";

    // Pull the existing endDate (if any) from localStorage
    const storedEndDate = getEndDateOrNull();

    await SendToServer(
      updatedData,
      cDataProlific,
      cDataTreatment,
      WD,
      startDate,
      storedEndDate
    );
    getWithExpiry();

    // Check if the current page is "ai_instruction_audit_page"
    if (survey.currentPage.name === "example_custom_matrix_page") {
      // Switch to ScannerPage
      setRenderComponent("scanner");
    }
  });

  // gotta do it this way to actually send to the survey, yes it's annoying
  survey.onComplete.add(async (survey) => {
    const cDataProlific = Cookies.get("prolificID");
    const cDataTreatment = Cookies.get("treatment");
    const updatedData = survey.data;
    const WD = "false";
    const endDate = new Date().toISOString();
    // Save to localStorage
    localStorage.setItem("endDate", endDate);

    await SendToServer(
      updatedData,
      cDataProlific,
      cDataTreatment,
      WD,
      startDate,
      endDate
    );
    window.location.href = "/end";
  });

  const surveyRef = useRef(null);

  // Take take of window size not getting too small for the Survey-component
  const surveyWindowSizeCheck = new ResizeObserver((entries) => {
    const entry = entries[0];
    setOpenWindowTooSmallDialogue(entry.contentRect.width <= 992);
  });

  useEffect(() => {
    const handlePageChange = (survey) => {
      if (survey.currentPage.name === "example_custom_matrix_page") {
        setRenderComponent("scanner");

        console.log("Switching to ScannerPage");
      }
    };

    survey.onCurrentPageChanged.add(handlePageChange);

    return () => {
      survey.onCurrentPageChanged.remove(handlePageChange);
    };
  }, [survey]);

  useEffect(() => {
    if (renderComponent === "surveyjs" && surveyRef.current) {
      surveyWindowSizeCheck.observe(surveyRef.current.rootRef.current);
    } else {
      surveyWindowSizeCheck.disconnect(); // 🛑 Stop checking when ScannerPage is active
    }

    return () => {
      surveyWindowSizeCheck.disconnect(); // ✅ Ensure cleanup when component unmounts
    };
  }, [surveyRef, renderComponent]); // ✅ Runs only when surveyRef or renderComponent changes

  return (
    <>
      {/* Top Bar with Opt-Out Button */}
      <div>
        <TopBar>
          <OptOutButton handleWithdrawSurvey={handleWithdrawSurvey} />
        </TopBar>

        {/* Progress Bar */}
        <PercentageProgressBar surveyModel={survey} title="Progress" />
      </div>

      {/* Conditional Rendering Based on renderComponent State */}
      {renderComponent === "surveyjs" ? (
        <Survey
          className="container mx-auto my-auto"
          model={survey}
          ref={surveyRef}
        />
      ) : renderComponent === "scanner" ? (
        <ScannerPage onComplete={() => setRenderComponent("surveyjs")} />
      ) : (
        <div>Invalid component to render</div>
      )}

      {/* Dialogue for Small Window Size */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openWindowTooSmallDialogue}
      >
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs style={{ display: "flex", alignItems: "center" }}>
                <ArrowBackIosIcon fontSize="large" />
              </Grid>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="div">
                  Please increase the width of your browser window.
                </Typography>
                <p>
                  To ensure a high quality of our survey, we want to make sure
                  that all questions are displayed correctly for all
                  participants.
                </p>
              </Grid>
              <Grid
                item
                xs
                style={{
                  display: "flex",
                  alignItems: "center",
                  direction: "rtl",
                  textAlign: "justify",
                }}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Backdrop>
    </>
  );
}