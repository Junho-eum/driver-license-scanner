// survey info
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import surveyJson from '../survey';
import {useEffect } from 'react';

// cookie
import Cookies from 'js-cookie';

// other components
import TopBar from "../web-components/TopBar";

// custom widgets
//import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
//import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
//import { ExamNextButton } from "../survey-components/NextButton";

// good resource: https://github.com/mongodb-developer/mern-stack-example/


async function fetchData(cookieID) {
  // cookie data
  const response = await fetch(`http://localhost:8080/postsurvey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prolificID: cookieID}),
  })
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.error(message);
    return { survey: {}, sessionData: cookieID };
  }
  else {
    const data = await response.json();
    console.log(data)
    const survey = data.survey;
    return { survey, sessionData: cookieID };
  }

}


export default function SurveyPage() {

  const cookieID = Cookies.get("prolificID");
  const survey = new Model(surveyJson);
  const data = fetchData(cookieID);
  survey.data = data.survey;

  // custom widgets
  //ExamConfirmationButton(survey);
  //CameraConfirmationButton(survey);
  //ExamNextButton(survey);
  
  useEffect(() => {
    // Update data on server with better error handling
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
    )
}