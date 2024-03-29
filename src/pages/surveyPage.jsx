// survey info
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import surveyJson from "../survey";
import { useEffect } from "react";

// cookie
import Cookies from "js-cookie";

// other components
import TopBar from "../web-components/TopBar";

// custom widgets
//import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
//import { ExamNextButton } from "../survey-components/NextButton";

// good resource: https://github.com/mongodb-developer/mern-stack-example/


const storageItemKey = "survey-data";
function saveSurveyData (survey) {
  const data = survey.data;
  data.pageNo = survey.currentPageNo;
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}


export default function SurveyPage() {
  
  // custom widgets
  ExamConfirmationButton(survey);
  //CameraConfirmationButton(survey);
  //ExamNextButton(survey);

  // getting stored value

  const survey = new Model(surveyJson);
  survey.onValueChanged.add(saveSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey) || null;
  if (prevData) {
      const data = JSON.parse(prevData);
      survey.data = data;
      if (data.pageNo) {
          survey.currentPageNo = data.pageNo;
      }
  }

  useEffect(() => {

    const handleValueChanged = async () => {
      const cData = Cookies.get("prolificID");
      const updatedData = survey.data;
      await fetch("http://localhost:8080/postsurvey", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prolificID: cData, surveyData: updatedData }),
      });
    };

    survey.onValueChanged.add(handleValueChanged);
  }, [survey]);

  return (
    <>
      <TopBar />
      <Survey model={survey} />
    </>
  );
}
