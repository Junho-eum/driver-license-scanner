// survey info
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import surveyJson from '../survey';

// other components
import TopBar from "../web-components/TopBar";

// custom widgets
//import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
//import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
//import { ExamNextButton } from "../survey-components/NextButton";


export default function SurveyPage() {

    const survey = new Model(surveyJson);
    
    // custom widgets
    //ExamConfirmationButton(survey);
    //CameraConfirmationButton(survey);
    //ExamNextButton(survey);
    
    return (
      <>
      <TopBar />
      <Survey model={survey} />
      </>
    )
}