// survey info
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import surveyJson from '../survey';

// styles


// custom widgets
import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
import { ExamNextButton } from "../survey-components/NextButton";


export function surveyPage() {
    const survey = new Model(surveyJson);
    
    // custom widgets
    ExamConfirmationButton(survey);
    CameraConfirmationButton(survey);
    ExamNextButton(survey);
    
    return (
      <>
      <Survey model={survey} />
      </>
    )
}