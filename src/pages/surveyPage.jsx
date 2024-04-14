// survey info
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import surveyJson from "../survey";
import { useEffect } from "react";

// cookie
import Cookies from "js-cookie";

// other components
import TopBar from "../web-components/TopBar";
//import Webcam from "react-webcam";
//import CameraBox from "../web-components/CameraBox";

// custom widgets
import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
import { ExamNextButton } from "../survey-components/NextButton";

// good resource: https://github.com/mongodb-developer/mern-stack-example/

const storageItemKey = "survey-data";
function saveSurveyData(survey) {
  const data = survey.data;
  data.pageNo = survey.currentPageNo;
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}

export default function SurveyPage() {
  const survey = new Model(surveyJson);
  survey.onValueChanged.add(saveSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  // custom widgets
  ExamConfirmationButton(survey);
  CameraConfirmationButton(survey);
  ExamNextButton(survey);

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey) || null;
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  
  //AJA: moved this to a direct call back function -- also maybe we save results only on next?
  survey.onValueChanged.add( async (survey, { name, question, value }) => {
      const cDataProlific = Cookies.get("prolificID");
      const cDataTreatment = Cookies.get("treatment");
      const updatedData = survey.data;
      console.log("SurveyJS: updating values");
      
      await fetch("/postsurvey", { //This should be read from an .env so it can change, right now assuming everything running on the same port
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prolificID: cDataProlific,
          surveyData: updatedData,
          treatment: cDataTreatment,
        }),
      });
    });

  // <CameraBox />
  // <div className="ml-56">
  //</div>
  return (
    <>
      <TopBar />

      <Survey model={survey} />
    </>
  );
}
